import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const dropdownListItem = z.object({
  text: z.string().default(""),
  value: z.string().default(""),
})

export type DropdownListItem = z.infer<typeof dropdownListItem>
