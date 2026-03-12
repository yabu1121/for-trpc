export type ApiType = "query" | "mutation";

export interface ApiEndpoint {
  chain: string;
  type: ApiType;
}

export const apiConfig: ApiEndpoint[] = [
  { chain: "example.hello", type: "query" },
  { chain: "example.inputHello", type: "query" },
  { chain: "tasks.createTask", type: "mutation" },
];
