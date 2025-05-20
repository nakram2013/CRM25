import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const profileSchema = z.object({
    facebookID: z.number().default(0),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    email: z.string().default(""),
    picture : z.string().default(""),
    
})

export type ProfileSchema = z.infer<typeof profileSchema>
