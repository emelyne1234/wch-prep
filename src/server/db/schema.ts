import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, timestamp, uuid, varchar,text} from "drizzle-orm/pg-core";
import * as dotenv from "dotenv";


dotenv.config();

const connectionString = process.env.DATABASE_URL as string;
const pool = neon(connectionString);
export const db = drizzle(pool);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", {length: 100}).unique().notNull(),
    username: varchar("username", {length: 100}).notNull(),
    password: varchar("password", {length: 100}).notNull(),
    expertise: varchar("expertise", {length: 100}),
    profileImage: varchar("image", {length: 300}),
    role_id: uuid("role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),
    bio: text("bio"),
    updated_at: timestamp("created_at"),
    created_at: timestamp("updated_at").defaultNow().notNull(), 
})
export const roles = pgTable("roles", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 20 }).notNull().unique(),
    description: varchar("description", { length: 255 }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export const forums = pgTable("forums",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        user_id: uuid("user_id").references(() => users.id, {onDelete: "cascade"}),
        title: varchar("title", { length: 255 }).notNull(),
        content: text("content").notNull(),
        created_at: timestamp("creates_at").defaultNow().notNull(),
        updated_at: timestamp("updated_at").defaultNow().notNull(),
      }

) 

export const forumsComments = pgTable("forumsComments",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        forum_id: uuid("forum_id").references(() => forums.id, {onDelete: "cascade"}).notNull(),
        user_id: uuid("user_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
        comment: text("comment").notNull(),
        created_at: timestamp("creates_at").defaultNow().notNull(),
        updated_at: timestamp("updated_at").defaultNow().notNull(),
      }

) 

export const articles = pgTable("articles", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", {length: 300}).notNull(),
    author_id: uuid("author_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    content: text('content').notNull(),
    type: varchar("type", {
        enum: ['article', 'case_study'],
        length: 10
    }),
    created_at: timestamp("creates_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })

  export const forumlikes = pgTable("forumlikes", {
    id: uuid("id").primaryKey().defaultRandom(),
    forum_id: uuid("forum_id").references(() => forums.id, {onDelete: "cascade"}).notNull(),
    user_id: uuid("user_id").references(() => users.id, {onDelete: "cascade"}).notNull(),
    created_at: timestamp("creates_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })

  export const animals = pgTable("animals", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {length: 100}).notNull(),
    species: varchar("species", {length: 100}).notNull(),
    description: varchar("description", {length: 200}),
    habitat: varchar("habitat", {length: 300}).notNull(),
    status: varchar("status",{enum: ["Endagered", "Vulnerable"], length: 30}),
    created_at: timestamp("creates_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })
  
export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    animal_id: uuid("animals_id").references(() => animals.id, {onDelete: "cascade"}).notNull(),
    title: varchar("title", {length: 100}).notNull(),
    description: text("description").notNull(),
    status: varchar("status",{enum: ['active', 'completed', 'planned'], length: 30}),
    created_at: timestamp("creates_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })

export const resources = pgTable("resources", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", {length: 100}).notNull(),
    description: text("description").notNull(),
    type: varchar("type",{enum: ['video', 'article', 'infographic', 'pdf'], length: 30}).notNull(),
    content_url: varchar("content_url", {length: 100}),
    created_at: timestamp("creates_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })