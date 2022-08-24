import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { playlistAPI } from '../../redux/services/PlaylistService';
import CreatePlaylistForm from '../createPlaylistForm'
import { PageLoading } from '../loaders/pageLoader';
import Playlist from '../playlist'
import './taskPlaylist.scss'

function TaskPlaylist() {

    const [isCreate, setIsCreate] = useState(false);
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }
    const [playlists, setPlaylists] = useState([])
    const { userData } = useAppSelector(state => state.userSlice)
    const { data, isLoading } = playlistAPI.useFetchUserPlaylistsQuery(userData.id)

    useEffect(() => {
        setPlaylists(data);
    })


    return (
        <div className='task-playlists-wrapper' >
            {isLoading
                ? <PageLoading />
                : <>
                    <h1 className={`task-playlist__head-text ${userData.theme}`}>Task playlists</h1>
                    <div className='task-playlists-wrapper__playlists'>
                        {playlists?.map(playlist =>
                            <Playlist key={playlist.id} title={playlist.name} image={playlist.image} id={playlist.id}
                            />)}
                        <div className={`task-playlists-wrapper__add-playlist-wrapper ${userData.theme}`}>
                            <div className="playlist" onClick={setIsCreateValue}>
                                <img src='./images/plus-circle128x128.png' />
                            </div>
                        </div>
                    </div>
                    {isCreate
                        ? <CreatePlaylistForm setIsCreateValue={setIsCreateValue} />
                        : null
                    }
                </>
            }
        </div>
    )
}

export default TaskPlaylist