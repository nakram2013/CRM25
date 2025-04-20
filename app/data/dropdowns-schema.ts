import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dropdownSchema = z.object({
    text: z.string(),
    value: z.string(),
    
})

export type DropdownSchema = z.infer<typeof dropdownSchema>
