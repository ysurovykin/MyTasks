;
import { IPlaylist } from "./IPlaylist";
import { IUser } from "./IUser";

export interface IUserState{
    userData: IUser;
    currentPage: string;
    isLoading: boolean;
    error: string;
}