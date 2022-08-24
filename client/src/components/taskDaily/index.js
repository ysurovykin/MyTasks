import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks/redux';
import { taskAPI } from '../../redux/services/TaskService';
import DailyTask from '../dailyTask';
import { PageLoading } from '../loaders/pageLoader';
import './taskDaily.scss'

function TaskDaily() {

    const [isMostImportantTasks, setIsMostImportantTasks] = useState(false);
    const [isImportantTasks, setIsImportantTasks] = useState(false);
    const [isCasualTasks, setIsCasualTasks] = useState(false);
    const today = new Date().toLocaleDateString();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfTheWeek = new Date();
    const todayDayOfTheWeek = weekdays[dayOfTheWeek.getDay()];

    const onClickMostImportantTasks = () => {
        setIsMostImportantTasks(!isMostImportantTasks);
    }
    const onClickImportantTasks = () => {
        setIsImportantTasks(!isImportantTasks);
    }
    const onClickCasualTasks = () => {
        setIsCasualTasks(!isCasualTasks);
    }

    const { userData } = useAppSelector(state => state.userSlice)
    const { data: taskData, isLoading } = taskAPI.useFetchTasksByDateQuery({ iduser: userData.id, date: today })

    const [mostTasks, setMostTasks] = useState([])
    const [importantTasks, setImportantTasks] = useState([])
    const [casualTasks, setCasualTasks] = useState([])
    const [tasksComplete, setTasksComplete] = useState()

    const tasksSort = (a, b) => (a.iscomplete && !b.iscomplete) ? 1 : -1

    useEffect(() => {
        setMostTasks(taskData?.filter(a => a.importance === 'most').sort(tasksSort))
        setImportantTasks(taskData?.filter(a => a.importance === 'important').sort(tasksSort))
        setCasualTasks(taskData?.filter(a => a.importance === 'casual').sort(tasksSort))
        setTasksComplete(taskData?.filter(a => a.iscomplete === true).length)
    }, [taskData])

    return (
        <div className='task-daily-wrapper '>
            {isLoading
                ? <PageLoading />
                : <>
                    <h1 className={`task-daily-wrapper__header_pc ${userData.theme}`}>{todayDayOfTheWeek}<br />{today}</h1>
                    <h1 className={`task-daily-wrapper__header_mobile ${userData.theme}`}>{todayDayOfTheWeek + ' ' + today}</h1>
                    <h1 className={`task-daily-wrapper__progress ${userData.theme}`}>Today`s proggress<br />{tasksComplete}/{taskData?.length} tasks</h1>
                    <div className='task-daily-wrapper__tasks-wrapper'>
                        <div className='task-daily-wrapper__most-important-tasks-wrapper'>
                            <div className={`task-daily-wrapper__most-important-tasks-header ${userData.theme}`}>
                                <h2>Most important tasks</h2>
                                <img src={`${userData.theme === 'light' ? "./images/section-arrow.png" : "./images/section-arrow-light.png"}`}
                                    alt='most-section' onClick={onClickMostImportantTasks}
                                    style={{ transform: `${isMostImportantTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isMostImportantTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                            </div>
                            {isMostImportantTasks
                                ? <div className={`task-daily-wrapper__most-important-tasks ${userData.theme}`}>
                                    {
                                        mostTasks?.length
                                            ? mostTasks?.map(task => <DailyTask key={task.id} id={task.id} isComplete={task.iscomplete} description={task.description} />)
                                            : <h2 className='task-daily-wrapper__empty'>You have not planned any most important task for today</h2>
                                    }
                                </div>
                                : null}
                        </div>
                        <div className='task-daily-wrapper__important-tasks-wrapper'>
                            <div className={`task-daily-wrapper__important-tasks-header ${userData.theme}`}>
                                <h2>Important tasks</h2>
                                <img src={`${userData.theme === 'light' ? "./images/section-arrow.png" : "./images/section-arrow-light.png"}`}
                                    alt='imp-section' onClick={onClickImportantTasks}
                                    style={{ transform: `${isImportantTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isImportantTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                            </div>
                            {isImportantTasks
                                ? <div className={`task-daily-wrapper__important-tasks ${userData.theme}`}>
                                    {
                                        importantTasks?.length
                                            ? importantTasks?.map(task => <DailyTask key={task.id} id={task.id} isComplete={task.iscomplete} description={task.description} />)
                                            : <h2 className='task-daily-wrapper__empty'>You have not planned any important task for today</h2>
                                    }
                                </div>
                                : null}
                        </div>
                        <div className='task-daily-wrapper__casual-tasks-wrapper'>
                            <div className={`task-daily-wrapper__casual-tasks-header ${userData.theme}`}>
                                <h2>Casual tasks</h2>
                                <img src={`${userData.theme === 'light' ? "./images/section-arrow.png" : "./images/section-arrow-light.png"}`}
                                    alt='casual-ssection' onClick={onClickCasualTasks}
                                    style={{ transform: `${isCasualTasks ? 'rotate(180deg)' : 'rotate(0deg)'}`, padding: `${isCasualTasks ? '0px 0px 0px 20px' : '0px 20px 0px 0px'}` }} />
                            </div>
                            {isCasualTasks
                                ? <div className={`task-daily-wrapper__casual-tasks ${userData.theme}`}>
                                    {
                                        casualTasks?.length
                                            ? casualTasks?.map(task => <DailyTask key={task.id} id={task.id} isComplete={task.iscomplete} description={task.description} />)
                                            : <h2 className='task-daily-wrapper__empty'>You have not planned any casual task for today</h2>
                                    }
                                </div>
                                : null}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TaskDaily