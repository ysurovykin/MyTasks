import { IUser } from "./IUser";

export interface IUserData {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}