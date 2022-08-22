import { taskAPI } from "../../redux/services/TaskService";

function DailyTask({ id, isComplete, description }) {

    const [setComplete, { }] = taskAPI.useCompleteTaskMutation()

    return (
        <div className="task-wrapper" style={{ backgroundColor: `${isComplete ? '#D0D0D0' : '#ffffff'}` }} onDoubleClick={() => setComplete({ id: id })}>
            <h2 style={{ textDecoration: `${isComplete ? 'line-through' : 'none'}` }}>{description}</h2>
            {isComplete
                ? <img className="task-wrapper__complete" src="./images/check-circle.png" alt="check" />
                : null
            }
        </div>
    )
}

export default DailyTask;