import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "@/server/db/schema";

export const createProjectSchema = createInsertSchema(projects).extend({
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  createdBy: z.string().optional(),
  impactMetrics: z.string().max(1000).optional(),
});
export type ProjectType = z.infer<typeof createProjectSchema>;
