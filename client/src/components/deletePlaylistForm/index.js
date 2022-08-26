import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { playlistAPI } from "../../redux/services/PlaylistService";
import { taskAPI } from "../../redux/services/TaskService";
import './deletePlaylistForm.scss'

function DeletePlaylistForm({ setIsDeleteValue, deletingPlaylist }) {
    const { data: playlistData } = playlistAPI.useFetchPlaylistQuery(deletingPlaylist)
    const [deletePlaylist, { }] = playlistAPI.useDeletePlaylistMutation();
    const [deletePlannedTasksFromPlaylist, { }] = taskAPI.useDeleteTasksFromPlaylistMutation();
    const { userData } = useAppSelector(state => state.userSlice)

    const cancelDelete = () => {
        setIsDeleteValue();
    }

    const handleDeletePlaylist = (e) => {
        e.preventDefault();
        try {
            deletePlannedTasksFromPlaylist({ idplaylist: playlistData?.id })
            deletePlaylist({ id: playlistData?.id })
            setIsDeleteValue()
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className={`delete-playlist-form-wrapper ${userData.theme}`}>
            <div className={`delete-playlist-form ${userData.theme}`}>
                <h1>You want to delete<br/>playlist {`\'${playlistData?.name}\'`}</h1>
                <div className={`playlist-form-buttons ${userData.theme}`}>
                    <button className='delete-btn' onClick={handleDeletePlaylist}>Delete</button>
                    <button className='cancel-btn' onClick={cancelDelete}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default DeletePlaylistForm