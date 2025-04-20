import { z } from "zod";
import dropdowns from "~/data/app-dropdowns.json";
import { dropdownSchema, type DropdownSchema } from "~/data/dropdowns-schema";



const parsedRoles = z.array(dropdownSchema).parse(dropdowns.userRoles);
export type RoleText = (typeof parsedRoles)[number]["text"];
export const getUserRoleNameByID = (role: number): string  => {
  const match = parsedRoles.find(item => item.value === role.toString());
  return match?.text ??"None"; // fallback to default
};
