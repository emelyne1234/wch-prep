import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  primaryKey,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL as string;
const pool = neon(connectionString);
export const db = drizzle(pool);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  username: varchar("username", { length: 100 }).notNull(),
  password: varchar("password", { length: 100 }).notNull(),
  expertise: varchar("expertise", { length: 100 }),
  profileImage: varchar("image", { length: 300 }),
  role_id: uuid("role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
  bio: text("bio"),
  updated_at: timestamp("created_at"),
  created_at: timestamp("updated_at").defaultNow().notNull(),
});
export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export const forums = pgTable("forums", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const forumsComments = pgTable("forumsComments", {
  id: uuid("id").primaryKey().defaultRandom(),
  forum_id: uuid("forum_id")
    .references(() => forums.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  comment: text("comment").notNull(),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  session_token: varchar("session_token").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verification_tokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier").notNull(),
    token: varchar("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    composite_pk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 300 }).notNull(),
  author_id: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  type: varchar("type", {
    enum: ["article", "case_study"],
    length: 10,
  }),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const articlesComments = pgTable("articlesComments", {
  id: uuid("id").primaryKey().defaultRandom(),
  articles_id: uuid("articles_id")
    .references(() => articles.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  comment: text("comment").notNull(),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const forumlikes = pgTable("forumlikes", {
  id: uuid("id").primaryKey().defaultRandom(),
  forum_id: uuid("forum_id")
    .references(() => forums.id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const animals = pgTable("animals", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  species: varchar("species", { length: 100 }).notNull(),
  description: varchar("description", { length: 200 }),
  habitat: varchar("habitat", { length: 300 }).notNull(),
  status: varchar("status", { enum: ["Endagered", "Vulnerable"], length: 30 }),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  project_id: uuid("project_id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  start_date: timestamp("start_date", { mode: "date" }).notNull(),
  end_date: timestamp("end_date", { mode: "date" }).notNull(),
  impact_metrics: jsonb("impact_metrics").notNull(),
  funding_status: varchar("funding_status", { length: 10 }).notNull(),
  evaluation: text("evaluation").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  created_by: uuid("created_by")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const project_goals = pgTable("project_goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  project_id: uuid("project_id")
    .references(() => projects.project_id, { onDelete: "cascade" })
    .notNull(),
  goal: text("goal").notNull(),
  is_achieved: boolean("is_achieved").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const project_needs = pgTable("project_needs", {
  id: uuid("id").primaryKey().defaultRandom(),
  project_id: uuid("project_id")
    .references(() => projects.project_id, { onDelete: "cascade" })
    .notNull(),
  need: text("need").notNull(),
  role_type: varchar("role_type", { length: 50 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  type: varchar("type", {
    enum: ["video", "article", "infographic", "pdf"],
    length: 30,
  }).notNull(),
  content_url: varchar("content_url", { length: 100 }),
  created_at: timestamp("creates_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const project_members = pgTable("project_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  project_id: uuid("project_id")
    .references(() => projects.project_id, { onDelete: "cascade" })
    .notNull(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  role_title: varchar("role_title", { length: 100 }).notNull(),
  bio: text("bio"),
  is_leader: boolean("is_leader").default(false).notNull(),
  status: varchar("status", { 
    enum: ["active", "inactive", "pending"],
    length: 20 
  }).default("pending").notNull(),
  contribution_hours: jsonb("contribution_hours"), // Track weekly/monthly hours
  responsibilities: text("responsibilities"),
  joined_date: timestamp("joined_date").defaultNow().notNull(),
  end_date: timestamp("end_date"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export function setDefaultRoleTrigger(): any {
  throw new Error("Function not implemented.");
}
export function setupAuditTriggers(): any {
  throw new Error("Function not implemented.");
}
