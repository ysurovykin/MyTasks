import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { playlistAPI } from '../../redux/services/PlaylistService';
import CreatePlaylistForm from '../createPlaylistForm'
import DeletePlaylistForm from '../deletePlaylistForm';
import EditPlaylistForm from '../editPlaylist';
import { PageLoading } from '../loaders/pageLoader';
import Playlist from '../playlist'
import './taskPlaylist.scss'

function TaskPlaylist() {

    const [isCreate, setIsCreate] = useState(false);
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }
    const [editingPlaylist, setEditingPlaylist] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const setIsEditValue = (id) => {
        setIsEdit(!isEdit);
        setEditingPlaylist(id)
    }
    const [isDelete, setIsDelete] = useState(false);
    const setIsDeleteValue = (id) => {
        setIsDelete(!isDelete);
        setEditingPlaylist(id)
    }
    const [playlists, setPlaylists] = useState([])
    const { userData } = useAppSelector(state => state.userSlice)
    const { data, isLoading } = playlistAPI.useFetchUserPlaylistsQuery(userData?.id)


    useEffect(() => {
        setPlaylists(data);
    }, [data])

    return (
        <div className='task-playlists-wrapper' >
            {isLoading
                ? <PageLoading />
                : <>
                    <h1 className={`task-playlist__head-text ${userData.theme}`}>Task playlists</h1>
                    <div className='task-playlists-wrapper__playlists'>
                        {playlists?.map(playlist =>
                            <Playlist key={playlist.id}
                                title={playlist.name}
                                background={playlist.background}
                                image={playlist.image}
                                id={playlist.id}
                                setIsEditValue={setIsEditValue}
                                setIsDeleteValue={setIsDeleteValue}
                            />)}
                        <div className={`task-playlists-wrapper__add-playlist-wrapper ${userData.theme}`}>
                            <div className="playlist" onClick={setIsCreateValue}>
                                <img src='./images/plus-circle128x128.png' alt='plus' />
                            </div>
                        </div>
                    </div>
                    {isCreate
                        ? <CreatePlaylistForm setIsCreateValue={setIsCreateValue} />
                        : null
                    }
                    {isEdit
                        ? <EditPlaylistForm setIsEditValue={setIsEditValue} editingPlaylist={editingPlaylist} />
                        : null
                    }
                    {isDelete
                        ? <DeletePlaylistForm setIsDeleteValue={setIsDeleteValue} deletingPlaylist={editingPlaylist} />
                        : null
                    }
                </>
            }
        </div>
    )
}

export default TaskPlaylist