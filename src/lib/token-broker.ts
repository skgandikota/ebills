import { getIdToken } from "./firebase";

const TOKEN_BROKER_URL = process.env.NEXT_PUBLIC_TOKEN_BROKER_URL!;

interface TokenResponse {
  token: string;
  repo: string;
  owner: string;
  expiresAt: string;
}

let cachedToken: TokenResponse | null = null;

function isTokenExpired(): boolean {
  if (!cachedToken) return true;
  const expiresAt = new Date(cachedToken.expiresAt).getTime();
  // Refresh 5 minutes before actual expiry
  return Date.now() > expiresAt - 5 * 60 * 1000;
}

export async function getGitHubToken(): Promise<TokenResponse> {
  if (cachedToken && !isTokenExpired()) {
    return cachedToken;
  }

  const idToken = await getIdToken();
  if (!idToken) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(TOKEN_BROKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token broker error: ${response.status} ${error}`);
  }

  cachedToken = await response.json();
  return cachedToken!;
}

export function clearTokenCache() {
  cachedToken = null;
}
