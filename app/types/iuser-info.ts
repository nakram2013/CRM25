export interface IUserInfo {
    userID?: number;
    firstName: string;
    lastName: string;
    gender: "Female" | "Male",
    email: string;
    password: string;
    status?: string;
    role: number;
    addedBy?: number;
    addedDate?: Date;
}