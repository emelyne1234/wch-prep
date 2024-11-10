import { z } from "zod";
import { passwordSchema } from "./passwordSchema";


export const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty("Email or Username is required")
    .refine(value => {
      return value.includes('@') ? z.string().email("Invalid Email").parse(value) : value.length > 0;
    }, {
      message: "Invalid Email or Username",
    }),
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: z.string().email("Invalid Email").nonempty("Email is required"),
  username: z.string().nonempty("Username is required"),
  password: passwordSchema
});


export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
