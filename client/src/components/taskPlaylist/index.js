import Playlist from '../playlist'
import './taskPlaylist.scss'

function taskPlaylist() {
    return (
        <div className='task-playlists-wrapper'>
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
                    <div className="playlist">
                        <img src='./images/plus-circle128x128.png'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default taskPlaylist