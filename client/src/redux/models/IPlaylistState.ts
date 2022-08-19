import { IPlaylist } from "./IPlaylist";
import { IUser } from "./IUser";

export interface IPlaylistState{
    playlist: IPlaylist;
    isLoading: false;
    error: string;
}