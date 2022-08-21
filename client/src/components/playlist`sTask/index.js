import { useState } from "react";
import { taskAPI } from "../../redux/services/TaskService";

function PlaylistsTask({ task, importanse, id, date }) {

    const circleColor = () => {
        switch (importanse) {
            case 'casual': return '#7CE393';
            case 'important': return '#F3D27B';
            case 'most': return '#E88282';
        }
    }

    const dateSplited = date.split('.');
    const task_date = `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]}`

    const [deleteTask, { }] = taskAPI.useDeleteTaskMutation();
    const [updateTask, { }] = taskAPI.useUpdateTaskMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskInput, setEditTaskInput] = useState(task);
    const [editTaskDateInput, setEditTaskDateInput] = useState(task_date);


    const handleIsEditing = () => {
        setIsEditing(!isEditing);
        setEditTaskInput(task);
    }

    const handleEdit = async () => {
        try {
            await updateTask({ description: editTaskInput, task_date: editTaskDateInput, importance: importanse, id: id })
            setIsEditing(!isEditing);
        } catch (e) { console.log(e.message) }
    }

    const handleEditTaskDateInput = (e) => {
        setEditTaskDateInput(e.target.value)
    }

    const handleEditTaskInput = (e) => {
        setEditTaskInput(e.target.value)
    }

    const handleDeleteTask = async () => {
        await deleteTask(id)
    }

    return (

        <div className='playlist-page-wrapper__task'>
            {isEditing
                ? <div className="playlist-page-wrapper__edit-wrapper">
                    <input
                        className="playlist-page-wrapper__edit-task-input"
                        value={editTaskInput}
                        onChange={handleEditTaskInput}
                        autoFocus
                    />
                    <input
                        type={'date'}
                        className="playlist-page-wrapper__edit-task-date-input"
                        onChange={handleEditTaskDateInput}
                        min={new Date().toISOString().split('T')[0]}
                        onKeyDown={(e) => e.preventDefault()}
                        defaultValue={task_date}
                    />

                </div>
                : <h2>{task}</h2>
            }
            <div className='importanse-circle' style={{ backgroundColor: `${circleColor()}` }}></div>
            {isEditing
                ? <>
                    <div className='playlist-page-wrapper__img-wrapper' onClick={handleIsEditing}>
                        <img src="./images/close-circle.png" alt="close-circle" />
                    </div>
                    <div className='playlist-page-wrapper__img-wrapper' onClick={handleEdit}>
                        <img src="./images/check-circle-bold.png" alt="check-circle" />
                    </div>
                </>
                : <>
                    <div className='playlist-page-wrapper__img-wrapper' onClick={handleDeleteTask}>
                        <img src="./images/trash-bin.png" alt="trash-bin" />
                    </div>
                    <div className='playlist-page-wrapper__img-wrapper' onClick={handleIsEditing}>
                        <img src="./images/edit32x32.png" alt="edit32x32" />
                    </div>
                </>
            }
        </div>

    )
}

export default PlaylistsTask