import { z } from "zod";
import dropdowns from "~/data/app-dropdowns.json";
import { dropdownSchema, type DropdownSchema } from "~/data/dropdowns-schema";


// Role dropdowns
const parsedRoles = z.array(dropdownSchema).parse(dropdowns.userRoles);
export type RoleText = (typeof parsedRoles)[number]["text"];
export const getUserRoleNameByID = (role: number): string  => {
  const match = parsedRoles.find(item => item.value === role.toString());
  return match?.text ??"None"; // fallback to default
};


// Status dropdowns
const parsedStatus = z.array(dropdownSchema).parse(dropdowns.userStatus);
export type StatusText = (typeof parsedStatus)[number]["text"];
export const getUserStatusNameByID = (Status: number): string  => {
  const match = parsedStatus.find(item => item.value === Status.toString());
  return match?.text ??"None"; // fallback to default
};