import { sql, relations } from "drizzle-orm";
import { text, integer, pgTableCreator, primaryKey, serial, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `swag_${name}`);

// --- Tables ---

export const users = createTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const projects = createTable("project", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  baseUrl: text("base_url").default("https://api.example.com"),
  version: text("version").default("1.0.0"),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const endpoints = createTable("endpoint", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  method: text("method").notNull(),
  summary: text("summary"),
  description: text("description"),
  isDeprecated: integer("is_deprecated").default(0),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const parameters = createTable("parameter", {
  id: serial("id").primaryKey(),
  endpointId: integer("endpoint_id")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  location: text("location").notNull(), // query, path, header, cookie
  dataType: text("data_type"),
  required: integer("required").default(0),
  description: text("description"),
});

export const responses = createTable("response", {
  id: serial("id").primaryKey(),
  endpointId: integer("endpoint_id")
    .notNull()
    .references(() => endpoints.id, { onDelete: "cascade" }),
  statusCode: integer("status_code").notNull(),
  description: text("description"),
  schemaJson: text("schema_json"),
});

export const tags = createTable("tag", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const endpointsToTags = createTable(
  "endpoints_to_tags",
  {
    endpointId: integer("endpoint_id")
      .notNull()
      .references(() => endpoints.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.endpointId, t.tagId] })]
);

// --- Test Data Tables ---

export const cafes = createTable("cafe", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  phoneNumber: text("phone_number"),
  rating: integer("rating"),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const posts = createTable("post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const zipcodes = createTable("zipcode", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  prefecture: text("prefecture").notNull(),
  city: text("city").notNull(),
  town: text("town").notNull(),
});

// --- Relations ---

export const projectsRelations = relations(projects, ({ many }) => ({
  endpoints: many(endpoints),
}));

export const endpointsRelations = relations(endpoints, ({ one, many }) => ({
  project: one(projects, {
    fields: [endpoints.projectId],
    references: [projects.id],
  }),
  parameters: many(parameters),
  responses: many(responses),
  tags: many(endpointsToTags),
}));

export const parametersRelations = relations(parameters, ({ one }) => ({
  endpoint: one(endpoints, {
    fields: [parameters.endpointId],
    references: [endpoints.id],
  }),
}));

export const responsesRelations = relations(responses, ({ one }) => ({
  endpoint: one(endpoints, {
    fields: [responses.endpointId],
    references: [endpoints.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  endpoints: many(endpointsToTags),
}));

export const endpointsToTagsRelations = relations(endpointsToTags, ({ one }) => ({
  endpoint: one(endpoints, {
    fields: [endpointsToTags.endpointId],
    references: [endpoints.id],
  }),
  tag: one(tags, {
    fields: [endpointsToTags.tagId],
    references: [tags.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
