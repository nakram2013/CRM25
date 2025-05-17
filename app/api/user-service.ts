import type { ILogin } from "~/types/ilogin";
import { apiClient } from "./api-client";
import type { z } from "zod";
import type { registerSchema } from "~/routes/auth/data/register-schema";

class UserService {
  async Register(userData: z.infer<typeof registerSchema>): Promise<any> {
    // Proper method syntax inside a class
   return await apiClient('/Api/Account/Register', {
      method: 'POST',
      data: userData, // The payload for the request
    });
    // If you want to log the response or do something with it, you can uncomment the console.log
    // console.log(newUser);
  }
  async Login(userData: ILogin): Promise<any> {
    // Proper method syntax inside a class
   return await apiClient('/Api/Account/Login', {
      method: 'POST',
      data: userData, // The payload for the request
    });
    // If you want to log the response or do something with it, you can uncomment the console.log
    // console.log(newUser);
  }
}

export const userService = new UserService();
