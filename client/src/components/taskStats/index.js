
import { useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useAppSelector } from '../../redux/hooks/redux'
import { taskAPI } from '../../redux/services/TaskService'
import { PageLoading } from '../loaders/pageLoader'
import './taskStats.scss'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    defaults,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

function TaskStats() {

    const { userData } = useAppSelector(state => state.userSlice)
    const [period, setPeriod] = useState('all')
    const { data: comletedTasks, isLoading: completeLoading } = taskAPI.useGetCompletedQuery({ iduser: userData.id, period: period })
    const { data: failedTasks, isLoading: failedLoading } = taskAPI.useGetFailedQuery({ iduser: userData.id, period: period })
    const { data: plannedTasks, isLoading: plannedLoading } = taskAPI.useGetPlanedQuery({ iduser: userData.id, period: period })
    const { data: daysSchedule, isLoading: daysLoading } = taskAPI.useGetDaysScheduledQuery({ iduser: userData.id, period: period })
    const { data: taskStats, isLoading: statsLoading } = taskAPI.useGetStatsQuery({ iduser: userData.id, period: period })
    const handleSetPeriod = (e) => {
        setPeriod(e.target.value)
    }
    return (
        <div className='task-stats-wrapper'>
            {(completeLoading || failedLoading || plannedLoading || daysLoading)
                ? <PageLoading />
                : <>
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
                    <div className='task-stats-wrapper__chart'>
                        <Bar
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: `${userData.theme === 'dark' ? 'white' : 'black'}`
                                        },
                                        position: 'top',
                                    },
                                    title: {
                                        display: false,
                                    },
                                },
                                indexAxis: 'x',
                                scales: {
                                    x: {
                                        ticks: {
                                            color: `${userData.theme === 'dark' ? 'white' : 'black'}`
                                        },
                                        grid: {
                                            color: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                            tickColor: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                            borderColor: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                        }
                                    },
                                    y: {
                                        ticks: {
                                            color: `${userData.theme === 'dark' ? 'white' : 'black'}`
                                        },
                                        grid: {
                                            color: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                            tickColor: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                            borderColor: `${userData.theme === 'dark' ? 'white' : 'black'}`,
                                        }
                                    }
                                },
                                maintainAspectRatio: false,
                            }}
                            data={{
                                labels: ['00:00-06:00', '06:00-09:00', '09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00', '21:00-00:00'],
                                datasets: [
                                    {
                                        label: '% of all tasks',
                                        data: taskStats,
                                        backgroundColor: '#F37BE7',
                                    },
                                ],
                            }}
                        />
                    </div>
                </>
            }
        </div>
    )
}

export default TaskStats