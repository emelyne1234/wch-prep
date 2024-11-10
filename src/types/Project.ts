import { createInsertSchema } from "drizzle-zod";
import { projects } from "@/server/db/schema";
import { z } from "zod";

export const createProjectSchema = createInsertSchema(projects);
export type ProjectType = z.infer<typeof createProjectSchema>;
