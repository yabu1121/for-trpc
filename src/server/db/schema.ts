import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * Configure your database schema here.
 * For the tRPC Workbench itself, no specific tables are required.
 */
export const createTable = pgTableCreator((name) => `swag_${name}`);
