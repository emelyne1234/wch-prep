import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { resources } from "@/server/db/schema";

export const resourceSchema = createInsertSchema(resources).extend({
  contentUrl: z.any().optional(),
  type: z.enum(["video", "article", "infographic", "pdf"], {
    message: "Invalid resource type",
  }),
  category: z.string({ message: "Category is required" }),
  description: z
    .string({ message: "Description is required" })
    .min(1)
    .max(10000),
  title: z.string({ message: "Title is required" }).min(1).max(100),
});

export type ResourceType = z.infer<typeof resourceSchema>;
