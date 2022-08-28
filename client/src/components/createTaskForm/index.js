import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks/redux";
import { taskAPI } from "../../redux/services/TaskService";
import './createTaskForm.scss'

function CreateTaskForm({ setIsCreateValue, playlistName }) {
    const [playlistInput, setPlaylistInput] = useState(`${playlistName ? playlistName : ''}`)
    const [taskInput, setTaskInput] = useState('');
    const [importanse, setImportanse] = useState('casual');
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [createTask, { }] = taskAPI.useCreateTaskMutation();
    const { userData } = useAppSelector(state => state.userSlice)
    const [isCorrectTask, setIsCorrectTask] = useState(true);

    const setTaskValue = (e) => {
        setIsCorrectTask(true)
        setTaskInput(e.target.value);
    }

    const cancelCreate = () => {
        setIsCreateValue();
        setTaskInput('');
        setPlaylistInput(playlistName)

    }
    const handleSetDate = (e) => {
        setDate(e.target.value);
    }
    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await createTask({ description: taskInput, playlist: playlistInput, importance: importanse, iscomplete: false, task_date: date, iduser: userData.id })
            if (!!response.error) {
                setIsCorrectTask(false);
            } else {
                setIsCorrectTask(true);
                setIsCreateValue();
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    const { register, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

    return (
        <div className='create-form-wrapper'>
            <div className={`create-form ${userData.theme}`}>
                <div className={`form-input ${userData.theme}`}>
                    <h2>What playlist does this task belong to?</h2>
                    <div className="input-wrapper">
                        <input className="input"
                            value={playlistInput}
                            placeholder={'Tasks 007'}
                            type={'text'}
                            readOnly
                        />
                    </div>
                </div>
                <div className={`form-input ${userData.theme}`}>
                    <h2>What should you do?</h2>
                    <div className="input-wrapper">
                        <input className={!errors.inputTask ? "input" : "input with-errors"}
                            value={taskInput}
                            placeholder={'I should be James Bond'}
                            type={'text'}
                            {...register('inputTask', { required: 'Enter task' })}
                            onChange={setTaskValue}
                        />
                    </div>
                    {errors.inputTask
                        ? <p>Enter playlist name</p>
                        : isCorrectTask
                            ? null
                            : <p>This task already exist at {date}</p>}
                </div>
                <div className={`form-input ${userData.theme}`}>
                    <h2>When should you do this task?</h2>
                    <div className="input-wrapper">
                        <input className={!errors.inputDate ? "input" : "input with-errors"}
                            type={'date'}
                            min={new Date().toISOString().split('T')[0]}
                            onKeyDown={(e) => e.preventDefault()}
                            defaultValue={new Date().toISOString().split('T')[0]}
                            {...register('inputDate', { required: 'Enter date' })}
                            onChange={handleSetDate}
                        />
                    </div>
                </div>
                <div className={`form-input ${userData.theme}`}>
                    <h2>Choose the priority for this task</h2>
                    <div className="input-wrapper circle-wrapper">
                        <div className='importance-wrapper'>
                            <div className="form-circle red-circle" onClick={() => setImportanse('most')}
                                style={importanse === 'most' ? { border: `${userData.theme === 'light' ? '2px solid black' : '2px solid white'}` } : null}
                            ></div>
                            <h3>High</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle yellow-circle" onClick={() => setImportanse('important')}
                                style={importanse === 'important' ? { border: `${userData.theme === 'light' ? '2px solid black' : '2px solid white'}` } : null}
                            ></div>
                            <h3>Medium</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle green-circle" onClick={() => setImportanse('casual')}
                                style={importanse === 'casual' ? { border: `${userData.theme === 'light' ? '2px solid black' : '2px solid white'}` } : null}
                            ></div>
                            <h3>Low</h3>
                        </div>
                    </div>
                </div>
                <div className={`form-buttons ${userData.theme}`}>
                    <button className='create-btn' disabled={!isValid} onClick={handleCreateTask}>Create</button>
                    <button className='cancel-btn' onClick={cancelCreate}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default CreateTaskForm