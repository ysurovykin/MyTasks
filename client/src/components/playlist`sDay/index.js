import { useParams } from "react-router-dom";
import { taskAPI } from "../../redux/services/TaskService";
import PlaylistsTask from "../playlist`sTask"

function PlaylistsDay({ date, id }) {

    const { data: tasks } = taskAPI.useFetchTasksByPlaylistAndDateQuery({ idplaylist: id, date });

    return (
        <div className='playlist-page-wrapper__task-wrapper'>
            <h2 className='playlist-page-wrapper__date'>{date}</h2>
            {tasks?.map(taskData => <PlaylistsTask key={taskData.id} task={taskData.description} importanse={taskData.importance} />)}
        </div>
    )
}

export default PlaylistsDay