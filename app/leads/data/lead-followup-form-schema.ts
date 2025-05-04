import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const leadFollowUpFormSchema = z.object({
  leadId: z.number().default(0) ,
  title: z.string().default(""),
  remarks: z.string().default(""),
  sourceofComunication: z.string().default(""),
  nextActivitySource: z.string().default(""),
  addedDate: z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val.endsWith("Z") ? val : val + "Z");
    }
    return val; // pass through if it's already a Date
  }, z.date()).default(new Date()),
  nextActivityDate: z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val.endsWith("Z") ? val : val + "Z");
    }
    return val; // pass through if it's already a Date
  }, z.date()).default(new Date()),
  step: z.number().default(2),
})

export type LeadFollowUpFormSchema = z.infer<typeof leadFollowUpFormSchema>
