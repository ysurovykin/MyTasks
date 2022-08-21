import { taskAPI } from "../../redux/services/TaskService";

function PlaylistsTask({task, importanse, id}) {

    const circleColor = () => {
        switch(importanse){
            case 'casual': return '#7CE393';
            case 'important': return '#F3D27B';
            case 'most': return '#E88282';
        }
    }

    const [deleteTask, { }] = taskAPI.useDeleteTaskMutation();

    const handleDeleteTask = () => {
        deleteTask(id)
    }

    return (

        <div className='playlist-page-wrapper__task'>
            <h2>{task}</h2>
            <div className='importanse-circle' style={{ backgroundColor: `${circleColor()}` }}></div>
            <div className='playlist-page-wrapper__img-wrapper' onClick={handleDeleteTask}>
                <img src="./images/trash-bin.png" alt="trash-bin" />
            </div>
            <div className='playlist-page-wrapper__img-wrapper'>
                <img src="./images/edit32x32.png" alt="edit32x32" />
            </div>
        </div>

    )
}

export default PlaylistsTask