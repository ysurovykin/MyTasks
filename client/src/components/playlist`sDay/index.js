import PlaylistsTask from "../playlist`sTask"

function PlaylistsDay({date}) {
    return (
        <div className='playlist-page-wrapper__task-wrapper'>
            <h2 className='playlist-page-wrapper__date'>{date}</h2>
            <PlaylistsTask task={'Make some exercises and then go to the gym and then go to the shop to buy some food to eat'} importanse={'casual'}/>
            <PlaylistsTask task={'Make 20 push-ups'} importanse={'most'}/>
        </div>
    )
}

export default PlaylistsDay