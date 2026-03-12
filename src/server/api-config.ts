export type ApiType = "query" | "mutation";

export interface ApiEndpoint {
  chain: string;
  type: ApiType;
}

/**
 * Configure your tRPC endpoints here.
 * Example: { chain: "example.hello", type: "query" }
 */
export const apiConfig: ApiEndpoint[] = [
  { chain: "example.hello", type: "query" },
];
