import type { ComponentType } from "react";

export type DispatchMeta = { id: string; date: string; time: string; title: string; summary: string; tags: string[]; filters: string[] };
export type Dispatch = DispatchMeta & { Body: ComponentType };

const modules = import.meta.glob<{ default: ComponentType; frontmatter: DispatchMeta }>("./dispatches/*.mdx", { eager: true });

export const dispatches: Dispatch[] = Object.values(modules)
  .map((m) => ({ ...m.frontmatter, Body: m.default }))
  .sort((a, b) => b.date.localeCompare(a.date));
