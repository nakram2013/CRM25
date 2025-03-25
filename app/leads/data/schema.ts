import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  leadId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  city: z.string(),
  contactNo: z.string(),
})

export type Task = z.infer<typeof taskSchema>
