import { useState } from 'react'
import Task from '../task';
import './taskDaily.scss'

function TaskDaily() {

    const [isMostImportantTasks, setIsMostImportantTasks] = useState(false);
    const [isImportantTasks, setIsImportantTasks] = useState(false);
    const [isCasualTasks, setIsCasualTasks] = useState(false);

    const onClickMostImportantTasks = () => {
        setIsMostImportantTasks(!isMostImportantTasks);
    }
    const onClickImportantTasks = () => {
        setIsImportantTasks(!isImportantTasks);
    }
    const onClickCasualTasks = () => {
        setIsCasualTasks(!isCasualTasks);
    }

    return (
        <div className='task-daily-wrapper'>
            <h1 className='task-daily-wrapper__header_pc'>Monday<br />01.08.2022</h1>
            <h1 className='task-daily-wrapper__header_mobile'>Monday 01.08.2022</h1>
            <h1 className='task-daily-wrapper__progress'>Today`s proggress<br />2/6 tasks</h1>
            <div className='task-daily-wrapper__tasks-wrapper'>
                <div className='task-daily-wrapper__most-important-tasks-wrapper'>
                    <div className='task-daily-wrapper__most-important-tasks-header'>
                        <h2>Most important tasks</h2>
                        <img src='./images/section-arrow.png' alt='most-section' onClick={onClickMostImportantTasks}
                            style={{ transform: `${isMostImportantTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isMostImportantTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                    </div>
                    {isMostImportantTasks
                        ? <div className='task-daily-wrapper__most-important-tasks'>
                            <Task isComplete={false} />
                            <Task isComplete={false} />
                            <div className='task-daily-wrapper__plus-img'>
                                <img src='./images/plus-circle.png'/>
                            </div>
                        </div>
                        : null}
                </div>
                <div className='task-daily-wrapper__important-tasks-wrapper'>
                    <div className='task-daily-wrapper__important-tasks-header'>
                        <h2>Important tasks</h2>
                        <img src='./images/section-arrow.png' alt='imp-section' onClick={onClickImportantTasks}
                            style={{ transform: `${isImportantTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isImportantTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                    </div>
                    {isImportantTasks
                        ? <div className='task-daily-wrapper__important-tasks'>
                            <Task isComplete={true} />
                            <Task isComplete={true} />
                            <Task isComplete={false} />
                            <Task isComplete={true} />
                            <div className='task-daily-wrapper__plus-img'>
                                <img src='./images/plus-circle.png'/>
                            </div>
                        </div>
                        : null}
                </div>
                <div className='task-daily-wrapper__casual-tasks-wrapper'>
                    <div className='task-daily-wrapper__casual-tasks-header'>
                        <h2>Casual tasks</h2>
                        <img src='./images/section-arrow.png' alt='casual-ssection' onClick={onClickCasualTasks}
                            style={{ transform: `${isCasualTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isCasualTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                    </div>
                    {isCasualTasks
                        ? <div className='task-daily-wrapper__casual-tasks'>
                            <div className='task-daily-wrapper__plus-img'>
                                <img src='./images/plus-circle.png'/>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default TaskDaily