import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const leadSchema = z.object({
  leadId: z.number().default(0) ,
  firstName: z.string().default(""),
  lastName: z.string().default(""),
  email: z.string().default(""), 
  city: z.string().default(""), 
  contactNo: z.string().default(""), 
  whatsApp: z.string().default(""), 
  occupation: z.string().default(""), 
  projectID: z.number().nullable().default(0), 
  referenceID: z.number().nullable().default(0), 
  sourceofComunication: z.string().default(""), 
  step: z.number().nullable().default(1)
})

export type Task = z.infer<typeof leadSchema>
