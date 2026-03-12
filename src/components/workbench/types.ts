import type { ReactNode } from "react";

export type ApiType = "query" | "mutation";

export interface Task {
  type: ApiType;
  icon: ReactNode;
  color: string;
  description: string;
  run: (utils: any, data?: any) => Promise<any>;
}

export type TaskMap = Record<string, Task>;
