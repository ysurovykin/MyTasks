import { useState } from "react";
import './createTaskForm.scss'

function CreateTaskForm({ setIsCreateValue, playlistName, importanse = 'casual' }) {
    const [playlistInput, setPlaylistInput] = useState(`${playlistName ? playlistName : ''}`)
    const [taskInput, setTaskInput] = useState('');

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
                            <div className="form-circle red-circle"
                                style={{ border: `${importanse === 'most' ? '1px solid black' : null}` }}
                            ></div>
                            <h3>High</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle yellow-circle"
                                style={{ border: `${importanse === 'important' ? '1px solid black' : null}` }}
                            ></div>
                            <h3>Medium</h3>
                        </div>
                        <div className='importance-wrapper'>
                            <div className="form-circle green-circle"
                                style={{ border: `${importanse === 'casual' ? '1px solid black' : null}` }}
                            ></div>
                            <h3>Low</h3>
                        </div>
                    </div>
                </div>
                <div className='form-buttons'>
                    <button className='create-btn'>Create</button>
                    <button className='cancel-btn' onClick={cancelCreate}>Cancel</button>
                </div>
            </div>
        </div>
    )
}


export default CreateTaskForm