import { useAppSelector } from "../../redux/hooks/redux";
import { taskAPI } from "../../redux/services/TaskService";

function DailyTask({ id, isComplete, description }) {


    const { userData } = useAppSelector(state => state.userSlice)
    const [setComplete, { }] = taskAPI.useCompleteTaskMutation()

    return (
        <div className="task-wrapper" style={{ backgroundColor: `${isComplete ? `${userData.theme === 'light' ? '#D0D0D0' : '#181818'}` : `${userData.theme === 'light' ? '#ffffff' : '#353535'}`}` }} onDoubleClick={() => setComplete({ id: id })}>
            <h2 style={{ textDecoration: `${isComplete ? 'line-through' : 'none'}` }}>{description}</h2>
            {isComplete
                ? <img className="task-wrapper__complete"
                    src={`${userData.theme === 'light' ? "./images/check-circle.png" : "./images/check-circle-light.png"}`}
                    alt="check" />
                : null
            }
        </div>
    )
}

export default DailyTask;