import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const DATABASEURL = process.env.NEON_DATABASE_URL!;

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASEURL,
  },
});
