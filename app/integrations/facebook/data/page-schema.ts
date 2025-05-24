import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const fbpageSchema = z.object({
    id: z.number().default(0),
    name: z.string().default(""),
    category: z.string().default(""),
    pageId: z.string().default(""),
    
})

export type FBPageSchema = z.infer<typeof fbpageSchema>
