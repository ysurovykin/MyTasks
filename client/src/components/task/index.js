
function Task({isComplete}) {

    return (
        <div className="task-wrapper" style={{backgroundColor: `${isComplete ? '#D0D0D0' : null}`}}>
            <h2 style={{textDecoration: `${isComplete ? 'line-through' : null}`}}>Walk the dog</h2>
            {isComplete
                ? <img className="task-wrapper__complete" src="./images/check-circle.png" alt="check" />
                : <div className="task-wrapper__edit-wrapper">
                    <img className="task-wrapper__edit" src="./images/edit.png" alt="edit" />
                </div>}
        </div>
    )
}

export default Task;