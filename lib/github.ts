const GITHUB_API = "https://api.github.com";

function ghFetch(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  return fetch(url, {
    next: { revalidate: 3600 },
    headers: (() => {
      const h: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
      if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      return h;
    })(),
    signal: controller.signal,
  }).finally(() => clearTimeout(timer));
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  archived: boolean;
  updated_at: string;
}

export interface GitHubUser {
  public_repos: number;
  followers: number;
  login: string;
  avatar_url: string;
}

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await ghFetch(`${GITHUB_API}/users/KorroAi`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await ghFetch(`${GITHUB_API}/users/KorroAi/repos?sort=updated&per_page=100`);
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    const BLOCKLIST = [
      "KorroAi",
      "korro-website",
      "korro-curated-automation",
      "korro-curated-bugbounty",
      "korro-curated-skills",
      "korro-curated-trading",
      "agent-store",
    ];
    return repos
      .filter((r) => !r.fork && !r.archived && !BLOCKLIST.includes(r.name))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch {
    return [];
  }
}
