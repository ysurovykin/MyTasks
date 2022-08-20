import { useState } from "react";
import { taskAPI } from "../../redux/services/TaskService";
import './createTaskForm.scss'

function CreateTaskForm({ setIsCreateValue, playlistName }) {
    const [playlistInput, setPlaylistInput] = useState(`${playlistName ? playlistName : ''}`)
    const [taskInput, setTaskInput] = useState('');
    const [importanse, setImportanse] = useState('casual');
    const [date, setDate] = useState('');
    const [createTask, { }] = taskAPI.useCreateTaskMutation();

    const setPlaylistValue = (e) => {
        setPlaylistInput(e.target.value);
    }
    const setTaskValue = (e) => {
        setTaskInput(e.target.value);
    }

    const cancelCreate = () => {
        setIsCreateValue();
        setTaskInput('');
        setPlaylistInput('Sport')

    }
    const handleSetDate = (e) => {
        setDate(e.target.value);
    }
    const handleCreateTask = (e) => {
        e.preventDefault();
        try {
            createTask({ description: taskInput, playlist: playlistInput, importance: importanse, iscomplete: false, task_date: date })
            setIsCreateValue();
        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <div className='create-form-wrapper'>
            <div className='create-form'>
                <div className='form-input'>
                    <h2>What playlist does this task belong to?</h2>
                    <div className="input-wrapper">
                        <input className="input"
                            value={playlistInput}
                            onChange={setPlaylistValue}
                            placeholder={'Tasks 007'}
                            type={'text'}
                        />
                    </div>
                </div>
                <div className='form-input'>
                    <h2>What should you do?</h2>
                    <div className="input-wrapper">
                        <input className="input"
                            value={taskInput}
                            onChange={setTaskValue}
                            placeholder={'I should be James Bond'}
                            type={'text'}
                        />
                    </div>
                </div>
                <div className='form-input'>
                    <h2>When should you do this task?</h2>
                    <div className="input-wrapper">
                        <input className="input"
                            onChange={handleSetDate}
                            type={'date'}
                            min={new Date().toISOString().split('T')[0]}
                            onKeyDown={(e) => e.preventDefault()}
                            defaultValue={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
                <div className='form-input'>
                    <h2>Choose the priority for this task</h2>
                    <div className="input-wrapper circle-wrapper">
                        <div className='importance-wrapper'>
                            <div className="form-circle red-circle" onClick={() => setImportanse('most')}
                                style={importanse === 'most' ? { border: '1px solid black' } : null}
                            ></div>
                            <h3>High</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle yellow-circle" onClick={() => setImportanse('important')}
                                style={importanse === 'important' ? { border: '1px solid black' } : null}
                            ></div>
                            <h3>Medium</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle green-circle" onClick={() => setImportanse('casual')}
                                style={importanse === 'casual' ? { border: '1px solid black' } : null}
                            ></div>
                            <h3>Low</h3>
                        </div>
                    </div>
                </div>
                <div className='form-buttons'>
                    <button className='create-btn' onClick={handleCreateTask}>Create</button>
                    <button className='cancel-btn' onClick={cancelCreate}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default CreateTaskForm