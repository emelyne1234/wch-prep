import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import {
  projects,
  projectMembers,
  projectGoals,
  projectNeeds,
} from "@/server/db/schema";

export const createProjectSchemaDTO = createInsertSchema(projects).extend({
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  createdBy: z.string().optional(),
  impactMetrics: z.string().max(1000).optional(),
  image: z.any({ message: "Image is required" }),
});

export const createProjectGoalSchemaDTO = createInsertSchema(projectGoals);

export const createProjectNeedSchemaDTO = createInsertSchema(projectNeeds);

export const projectSchema = createInsertSchema(projects);

export const projectMemberSchema = createInsertSchema(projectMembers);

export type ProjectMemberType = z.infer<typeof projectMemberSchema>;
export type ProjectGoalType = z.infer<typeof createProjectGoalSchemaDTO>;
export type ProjectNeedType = z.infer<typeof createProjectNeedSchemaDTO>;
export type CreateProjectDTO = z.infer<typeof createProjectSchemaDTO>;

export type ProjectType = z.infer<typeof projectSchema>;
