import { Octokit } from "@octokit/rest";
import { getGitHubToken } from "./token-broker";
import type { BillData, BillMeta, BillTemplate, UserMetadata } from "@/types/bill";

let octokit: Octokit | null = null;
let currentRepo = "";
let currentOwner = "";

async function getClient(): Promise<{ client: Octokit; owner: string; repo: string }> {
  const tokenData = await getGitHubToken();

  if (!octokit || currentRepo !== tokenData.repo) {
    octokit = new Octokit({ auth: tokenData.token });
    currentRepo = tokenData.repo;
    currentOwner = tokenData.owner;
  }

  return { client: octokit, owner: currentOwner, repo: currentRepo };
}

// --- Bills ---

export async function listBills(): Promise<BillMeta[]> {
  const { client, owner, repo } = await getClient();
  try {
    const { data } = await client.repos.getContent({
      owner,
      repo,
      path: "bills",
    });

    if (!Array.isArray(data)) return [];

    const bills: BillMeta[] = [];
    for (const file of data) {
      if (file.name.endsWith(".json") && file.name !== "index.json") {
        try {
          const content = await getFileContent(client, owner, repo, file.path);
          const bill: BillData = JSON.parse(content);
          bills.push({
            id: bill.id,
            billNumber: bill.billNumber,
            clientName: bill.client.name,
            totalAmount: bill.totalAmount,
            currency: bill.currency,
            templateId: bill.templateId,
            status: bill.status,
            createdAt: bill.billDate,
            updatedAt: bill.billDate,
          });
        } catch {
          // Skip malformed bills
        }
      }
    }

    return bills.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (e: unknown) {
    if (e instanceof Error && "status" in e && (e as { status: number }).status === 404) {
      return [];
    }
    throw e;
  }
}

export async function getBill(id: string): Promise<BillData> {
  const { client, owner, repo } = await getClient();
  const content = await getFileContent(client, owner, repo, `bills/${id}.json`);
  return JSON.parse(content);
}

export async function saveBill(bill: BillData): Promise<void> {
  const { client, owner, repo } = await getClient();
  const path = `bills/${bill.id}.json`;
  const content = JSON.stringify(bill, null, 2);

  await createOrUpdateFile(client, owner, repo, path, content, `Save bill ${bill.billNumber}`);
}

export async function deleteBill(id: string): Promise<void> {
  const { client, owner, repo } = await getClient();
  const path = `bills/${id}.json`;

  const { data } = await client.repos.getContent({ owner, repo, path });
  if (!Array.isArray(data) && "sha" in data) {
    await client.repos.deleteFile({
      owner,
      repo,
      path,
      message: `Delete bill ${id}`,
      sha: data.sha,
    });
  }
}

// --- User Metadata ---

export async function getUserMetadata(): Promise<UserMetadata> {
  const { client, owner, repo } = await getClient();
  try {
    const content = await getFileContent(client, owner, repo, "metadata.json");
    return JSON.parse(content);
  } catch {
    const defaultMeta: UserMetadata = {
      nextBillNumber: 1,
      savedClients: [],
      customTemplates: [],
      preferences: {
        defaultCurrency: "USD",
        defaultTemplate: "standard-invoice",
        dateFormat: "DD/MM/YYYY",
      },
    };
    return defaultMeta;
  }
}

export async function saveUserMetadata(metadata: UserMetadata): Promise<void> {
  const { client, owner, repo } = await getClient();
  const content = JSON.stringify(metadata, null, 2);
  await createOrUpdateFile(client, owner, repo, "metadata.json", content, "Update metadata");
}

// --- Custom Templates ---

export async function listCustomTemplates(): Promise<BillTemplate[]> {
  const { client, owner, repo } = await getClient();
  try {
    const { data } = await client.repos.getContent({
      owner,
      repo,
      path: "templates",
    });
    if (!Array.isArray(data)) return [];
    const jsonFiles = data.filter((f) => f.name.endsWith(".json"));
    const templates: BillTemplate[] = [];
    for (const file of jsonFiles) {
      try {
        const content = await getFileContent(client, owner, repo, `templates/${file.name}`);
        if (content) {
          templates.push(JSON.parse(content) as BillTemplate);
        }
      } catch {
        // skip corrupt files
      }
    }
    return templates;
  } catch {
    return [];
  }
}

export async function saveCustomTemplate(
  template: BillTemplate
): Promise<void> {
  const { client, owner, repo } = await getClient();
  const content = JSON.stringify(template, null, 2);
  await createOrUpdateFile(
    client,
    owner,
    repo,
    `templates/${template.id}.json`,
    content,
    `Save template ${template.name}`
  );
}

// --- Assets (logo upload) ---

export async function uploadAsset(filename: string, base64Content: string): Promise<string> {
  const { client, owner, repo } = await getClient();
  const path = `assets/${filename}`;
  await createOrUpdateFile(client, owner, repo, path, base64Content, `Upload ${filename}`, true);

  // Return raw GitHub URL
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
}

// --- Internal helpers ---

async function getFileContent(
  client: Octokit,
  owner: string,
  repo: string,
  path: string
): Promise<string> {
  const { data } = await client.repos.getContent({ owner, repo, path });
  if (Array.isArray(data) || !("content" in data)) {
    throw new Error(`${path} is not a file`);
  }
  return atob(data.content);
}

async function createOrUpdateFile(
  client: Octokit,
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  isBase64: boolean = false
): Promise<void> {
  let sha: string | undefined;

  try {
    const { data } = await client.repos.getContent({ owner, repo, path });
    if (!Array.isArray(data) && "sha" in data) {
      sha = data.sha;
    }
  } catch {
    // File doesn't exist yet — that's fine
  }

  await client.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: isBase64 ? content : btoa(unescape(encodeURIComponent(content))),
    sha,
  });
}
