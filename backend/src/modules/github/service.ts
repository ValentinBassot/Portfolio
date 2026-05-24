const TOKEN = process.env.GITHUB_TOKEN?.trim() || '';

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  updated_at?: string;
};

function normalizeOrg(value: string): string {
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const segments = parsedUrl.pathname.split('/').filter(Boolean);
    return segments[0] || '';
  } catch {
    return value.replace(/^https?:\/\/github\.com\//i, '').replace(/\/+$/, '');
  }
}

function normalizeTeam(value: string): string {
  if (!value) {
    return '';
  }

  try {
    const parsedUrl = new URL(value);
    const segments = parsedUrl.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  } catch {
    return value.replace(/^https?:\/\/github\.com\//i, '').replace(/\/+$/, '');
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

async function fetchPaginatedRepos(url: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];

  for (let page = 1; page <= 10; page++) {
    const pageUrl = `${url}${url.includes('?') ? '&' : '?'}per_page=100&page=${page}`;
    const pageRepos = await fetchJson<GitHubRepo[]>(pageUrl);
    repos.push(...pageRepos);

    if (pageRepos.length < 100) break;
  }

  return repos;
}

async function fetchPaginatedOrgOrUserRepos(name: string): Promise<GitHubRepo[]> {
  try {
    return await fetchPaginatedRepos(`https://api.github.com/orgs/${name}/repos?type=all`);
  } catch {
    return await fetchPaginatedRepos(`https://api.github.com/users/${name}/repos`);
  }
}

async function getReadmeSummary(fullName: string): Promise<string | null> {
  try {
    const readme = await fetchJson<{ content?: string; encoding?: string }>(`https://api.github.com/repos/${fullName}/readme`);

    if (!readme.content || readme.encoding !== 'base64') return null;

    const content = Buffer.from(readme.content, 'base64').toString('utf8');
    const paragraphs = content
      .replace(/\r/g, '')
      .split(/\n\s*\n/)
      .map(p => p.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim())
      .filter(p => p.length > 0 && !p.startsWith('#'));

    return paragraphs.length > 0 ? paragraphs[0].slice(0, 220) : null;
  } catch {
    return null;
  }
}

async function isUserContributor(fullName: string, userLogin: string): Promise<boolean> {
  try {
    const contributors = await fetchJson<{ login: string }[]>(`https://api.github.com/repos/${fullName}/contributors?per_page=100`);
    return contributors.some(c => c.login.toLowerCase() === userLogin.toLowerCase());
  } catch {
    return false;
  }
}

function extractTokens(name: string): string[] {
  const parts = name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const tokens = parts.map(p => p.replace(/\d+$/g, '')).filter(p => p.length >= 4 && /[a-z]/.test(p));
  return Array.from(new Set(tokens));
}

const sortByDate = (a: GitHubRepo, b: GitHubRepo) => 
  new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();



export const fetchGroupedRepos = async () => {
  const org = normalizeOrg(process.env.GITHUB_ORG || '');
  const teamEpitech = normalizeTeam(process.env.GITHUB_TEAM_EPITECH || 'epitech');
  const teamPoc = normalizeTeam(process.env.GITHUB_TEAM_POC || 'poc');

  if (!org) throw new Error('GITHUB_ORG not set');

  let userLogin: string;
  try {
    const user = await fetchJson<{ login: string }>('https://api.github.com/user');
    userLogin = user.login;
  } catch {
    throw new Error('Could not fetch current user login');
  }

  const [epitechRepos, pocRepos, orgRepos] = await Promise.all([
    fetchPaginatedOrgOrUserRepos(teamEpitech),
    fetchPaginatedOrgOrUserRepos(teamPoc),
    fetchPaginatedOrgOrUserRepos(org),
  ]);

  const epitechSet = new Set(epitechRepos.map(r => r.full_name));
  const pocSet = new Set(pocRepos.map(r => r.full_name));

  const others = orgRepos.filter(r => !epitechSet.has(r.full_name) && !pocSet.has(r.full_name));

  const enrichRepo = (r: GitHubRepo): Promise<GitHubRepo> =>
    getReadmeSummary(r.full_name).then((readmeSummary) => ({
      ...r,
      description: r.description || readmeSummary,
      updated_at: r.updated_at || new Date().toISOString(),
    }));

  const [epitechMapped, pocMapped, othersMapped] = await Promise.all([
    Promise.all(epitechRepos.map(enrichRepo)),
    Promise.all(pocRepos.map(enrichRepo)),
    Promise.all(others.map(enrichRepo)),
  ]);

  const epitechFiltered = epitechMapped.sort(sortByDate);

  const tokenCounts: Record<string, number> = {};
  const repoTokens: Record<number, string[]> = {};

  for (const r of epitechFiltered) {
    const tokens = extractTokens(r.name);
    repoTokens[r.id] = tokens;
    for (const token of tokens) {
      tokenCounts[token] = (tokenCounts[token] || 0) + 1;
    }
  }

  const groupTokens = new Set(Object.keys(tokenCounts).filter(k => tokenCounts[k] >= 2));

  const epitechGrouped: Record<string, GitHubRepo[]> = {};
  const epitechUngrouped: GitHubRepo[] = [];

  for (const r of epitechFiltered) {
    const tokens = repoTokens[r.id] || [];
    let bestToken: string | null = null;
    let bestCount = 0;

    for (const token of tokens) {
      if (!groupTokens.has(token)) continue;
      const count = tokenCounts[token] || 0;
      if (count > bestCount) {
        bestToken = token;
        bestCount = count;
      }
    }

    if (bestToken) {
      const label = bestToken.replace(/[-_]/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
      if (!epitechGrouped[label]) epitechGrouped[label] = [];
      epitechGrouped[label].push(r);
    } else {
      epitechUngrouped.push(r);
    }
  }

  for (const group of Object.values(epitechGrouped)) {
    group.sort(sortByDate);
  }

  pocMapped.sort(sortByDate);
  othersMapped.sort(sortByDate);

  return {
    epitech: epitechFiltered,
    epitechGrouped,
    epitechUngrouped,
    poc: pocMapped,
    others: othersMapped,
  };
};

export async function fetchReadmeHtml(fullName: string): Promise<string> {
  const url = `https://api.github.com/repos/${fullName}/readme`;
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3.html' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }
  return res.text();
}
