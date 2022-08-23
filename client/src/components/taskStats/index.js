
import { useState } from 'react'
import { useAppSelector } from '../../redux/hooks/redux'
import { taskAPI } from '../../redux/services/TaskService'
import './taskStats.scss'

function TaskStats() {

    const {userData} = useAppSelector(state => state.userSlice)
    const [period, setPeriod] = useState('all')
    const {data: comletedTasks} = taskAPI.useGetCompletedQuery({iduser: userData.id, period: period})
    const {data: failedTasks} = taskAPI.useGetFailedQuery({iduser: userData.id, period: period})
    const {data: plannedTasks} = taskAPI.useGetPlanedQuery({iduser: userData.id, period: period})
    const {data: daysSchedule} = taskAPI.useGetDaysScheduledQuery({iduser: userData.id, period: period})
    const handleSetPeriod = (e) => {
        setPeriod(e.target.value)
    }

    return (
        <div className='task-stats-wrapper'>
            <h1 className={`head-text ${userData.theme}`}>Tasks Stats</h1>
            <div className={`task-stats-wrapper__combobox-wrapper ${userData.theme}`}>
                <select className={`task-stats-wrapper__combobox ${userData.theme}`} onChange={handleSetPeriod}>
                    <option value="all">All time</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                </select>
            </div>
            <div className='task-stats-wrapper__content'>
                <div className={`task-stats-wrapper__task-completed task-stats-wrapper__task-section  ${userData.theme}`}>
                    <h2>{comletedTasks}</h2>
                    <h3>Tasks completed</h3>
                </div>
                <div className={`task-stats-wrapper__task-planned task-stats-wrapper__task-section  ${userData.theme}`}>
                    <h2>{plannedTasks}</h2>
                    <h3>Tasks planned</h3>
                </div>
                <div className={`task-stats-wrapper__task-failed task-stats-wrapper__task-section  ${userData.theme}`}>
                    <h2>{failedTasks}</h2>
                    <h3>Tasks failed</h3>
                </div>
                <div className={`task-stats-wrapper__days-sheduled task-stats-wrapper__task-section  ${userData.theme}`}>
                    <h2>{daysSchedule}</h2>
                    <h3>Days were sheduled</h3>
                </div>
            </div>
            <div className='task-stats-wrapper__chart'>Stats</div>
     
        </div>
    )
}

export default TaskStats