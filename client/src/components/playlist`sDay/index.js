
import { useEffect, useState } from "react";
import { taskAPI } from "../../redux/services/TaskService";
import PlaylistsTask from "../playlist`sTask"

function PlaylistsDay({ date, id, searchedTask }) {

    const { data: tasks } = taskAPI.useFetchTasksByPlaylistAndDateQuery({ idplaylist: id, date });
    const [filtredTasks, setFiltredTasks] = useState([]);


    useEffect(() => {
        setFiltredTasks(tasks?.filter(searchText => searchText.description.toLowerCase().includes(searchedTask.toLowerCase())));
    }, [searchedTask, tasks])

    return (
        <>
            {
                filtredTasks?.length
                    ? <div className='playlist-page-wrapper__task-wrapper'>
                        <h2 className='playlist-page-wrapper__date' > {date}</h2 >
                        {filtredTasks?.map(taskData => <PlaylistsTask key={taskData.id} id={taskData.id} date={date} task={taskData.description} importanse={taskData.importance} />)}
                    </div >
                    : null
            }
        </>
    )
}

export default PlaylistsDay