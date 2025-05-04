import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const leadSchema = z.object({
  leadId: z.number().default(0),
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
  step: z.number().nullable().default(1),
  nextActivitySource: z.string().default(""),
  title: z.string().default(""),
  remarks: z.string().default(""),
  nextActivityDate: z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val.endsWith("Z") ? val : val + "Z");
    }
    return val; // pass through if it's already a Date
  }, z.date()).nullable().default(new Date())

})

export type Task = z.infer<typeof leadSchema>
