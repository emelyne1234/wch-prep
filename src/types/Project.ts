import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "@/server/db/schema";

export const createProjectSchemaDTO = createInsertSchema(projects).extend({
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  createdBy: z.string().optional(),
  impactMetrics: z.string().max(1000).optional(),
  image: z.any({ message: "Image is required" }),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchemaDTO>;
export const projectSchema = createInsertSchema(projects);
export type ProjectType = z.infer<typeof projectSchema>;
