import {
  placeholderProjects,
  placeholderStack,
  type Project,
  type StackGroup,
} from "./portfolio-data";

/**
 * Work & stack come from an external API once VITE_PORTFOLIO_API_URL is set
 * (expects GET {url}/work -> Project[] and GET {url}/stack -> StackGroup[]).
 * Until then, the placeholder data is served. Both reads are client-side so the
 * site can be deployed as a fully static SPA.
 */
const API_URL = import.meta.env.VITE_PORTFOLIO_API_URL as string | undefined;

async function fromApi<T>(
  path: string,
  fallback: T,
): Promise<{ data: T; source: "api" | "placeholder" }> {
  const base = API_URL;
  if (!base) return { data: fallback, source: "placeholder" };
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error(`Portfolio API ${path} failed [${res.status}]: ${await res.text()}`);
      return { data: fallback, source: "placeholder" };
    }
    return { data: (await res.json()) as T, source: "api" };
  } catch (err) {
    console.error(`Portfolio API ${path} error`, err);
    return { data: fallback, source: "placeholder" };
  }
}

export const getWork = () => fromApi<Project[]>("work", placeholderProjects);
export const getStack = () => fromApi<StackGroup[]>("stack", placeholderStack);

export type Commit = { sha: string; repo: string; message: string; date: string; url: string };

const GITHUB_USERNAME =
  (import.meta.env.VITE_GITHUB_USERNAME as string | undefined) || "ashmit-aryan";

export async function getGithubLog(): Promise<{ commits: Commit[]; error: string | null }> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=50`,
      {
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!res.ok) {
      console.error(`GitHub events failed [${res.status}]: ${await res.text()}`);
      return { commits: [], error: `GITHUB_API ${res.status}` };
    }
    const events = (await res.json()) as Array<{
      type: string;
      repo: { name: string };
      created_at: string;
      payload: { commits?: Array<{ sha: string; message: string }> };
    }>;
    const commits: Commit[] = [];
    for (const e of events) {
      if (e.type !== "PushEvent") continue;
      for (const c of e.payload.commits ?? []) {
        commits.push({
          sha: c.sha.slice(0, 7),
          repo: e.repo.name,
          message: c.message.split("\n")[0] ?? "",
          date: e.created_at,
          url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
        });
      }
    }
    return { commits: commits.slice(0, 8), error: null };
  } catch (err) {
    console.error("GitHub events error", err);
    return { commits: [], error: "GITHUB_API UNREACHABLE" };
  }
}
