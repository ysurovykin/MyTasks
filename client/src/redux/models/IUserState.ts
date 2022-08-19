;
import { IPlaylist } from "./IPlaylist";
import { IUser } from "./IUser";

export interface IUserState{
    userData: IUser;
    isLoading: boolean;
    error: string;
}