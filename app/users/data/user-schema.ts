import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
    userID: z.number().default(0),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    email: z.string().default(""),
    Image : z.string().default(""),
    gender: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().default(1)),
    password: z.string().default(""),
    status: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().default(0)),
    role: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().default(0)),
    addedBy: z.number().nullable().default(0),
    addedDate: z.preprocess((val) => {
      if (typeof val === "string") {
        return new Date(val.endsWith("Z") ? val : val + "Z");
      }
      return val; // pass through if it's already a Date
    }, z.date()).default(new Date())
    
})

export type UserSchema = z.infer<typeof userSchema>
