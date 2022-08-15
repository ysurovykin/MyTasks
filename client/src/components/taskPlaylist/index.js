import { useState } from 'react';
import CreatePlaylistForm from '../createPlaylistForm'
import Playlist from '../playlist'
import './taskPlaylist.scss'

function TaskPlaylist() {

    const [isCreate, setIsCreate] = useState(false);
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }

    return (
        <div className='task-playlists-wrapper' >
            <h1>Task playlists</h1>
            <div className='task-playlists-wrapper__playlists'>
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <Playlist />
                <div className="task-playlists-wrapper__add-playlist-wrapper">
                    <div className="playlist" onClick={setIsCreateValue}>
                        <img src='./images/plus-circle128x128.png' />
                    </div>
                </div>
            </div>
            {isCreate
                ? <CreatePlaylistForm setIsCreateValue={setIsCreateValue} />
                : null
            }
        </div>
    )
}

export default TaskPlaylist