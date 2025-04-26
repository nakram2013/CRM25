import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const registerSchema = z.object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .default(""),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .default(""),
    email: z
      .string()
      .email("Invalid email address")
      .default(""),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .default(""),
  repeatPassword: z
    .string()
    .default(""),
    
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>
