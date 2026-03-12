export type ApiType = "query" | "mutation";

export interface ApiEndpoint {
  chain: string;
  type: ApiType;
}

export const apiConfig: ApiEndpoint[] = [
  // MUTATIONS
  { chain: "testData.seed", type: "mutation" },
  
  // QUERIES
  { chain: "testData.getCafes", type: "query" },
  { chain: "user.getAll", type: "query" },
  { chain: "project.getAll", type: "query" },
  { chain: "endpoint.search", type: "query" },
  { chain: "testData.getPosts", type: "query" },
  { chain: "testData.getZipcodes", type: "query" },
];
