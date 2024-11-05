import { z } from "zod";

const passwordStrength = (Password: string) => {
  const messages = [];
  if (!/[a-z]/.test(Password)) {
    messages.push("at least one lowercase letter");
  }
  if (!/[A-Z]/.test(Password)) {
    messages.push("at least one uppercase letter");
  }
  if (!/\d/.test(Password)) {
    messages.push("at least one number");
  }
  if (!/[@$!%*?&#]/.test(Password)) {
    messages.push("at least one special character");
  }
  if (Password.length < 8) {
    messages.push("at least 8 characters");
  }
  if (messages.length > 0) {
    return `Password must contain ${messages.join(", ")}`;
  }
  return null;
};

export const passwordSchema = z.string().superRefine((Password, ctx) => {
  const errorMessage = passwordStrength(Password);
  if (errorMessage) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: errorMessage,
    });
  }
});