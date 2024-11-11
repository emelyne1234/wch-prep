import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "@/server/db/schema";

export const createProjectSchema = createInsertSchema(projects);
export type ProjectType = z.infer<typeof createProjectSchema>;
