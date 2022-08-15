import './taskStats.scss'

function TaskStats() {
    return (
        <div className='task-stats-wrapper'>
            <h1>Tasks Stats</h1>
            <div className='task-stats-wrapper__combobox-wrapper'>
                <select className='task-stats-wrapper__combobox'>
                    <option value="all">All time</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                </select>
            </div>
            <div className='task-stats-wrapper__content'>
                <div className='task-stats-wrapper__task-comleted task-stats-wrapper__task-section'>
                    <h2>135</h2>
                    <h3>Tasks completed</h3>
                </div>
                <div className='task-stats-wrapper__task-planned task-stats-wrapper__task-section'>
                    <h2>45</h2>
                    <h3>Tasks planned</h3>
                </div>
                <div className='task-stats-wrapper__task-failed task-stats-wrapper__task-section'>
                    <h2>15</h2>
                    <h3>Tasks failed</h3>
                </div>
                <div className='task-stats-wrapper__days-sheduled task-stats-wrapper__task-section'>
                    <h2>23</h2>
                    <h3>Days were sheduled</h3>
                </div>
            </div>
            <div className='task-stats-wrapper__chart'>Stats</div>
            <div className='whitespace'></div>
        </div>
    )
}

export default TaskStats