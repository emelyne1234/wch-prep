import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const DATABASEURL = process.env.DATABASE_URL!
console.log('database url', DATABASEURL)

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASEURL
  },
});