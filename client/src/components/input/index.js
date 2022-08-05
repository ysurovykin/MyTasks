import './input.scss'

function input({ id, value, setValue, type, placeHolder, title }) {
    return (<div id={id} className='input-and-title'>
        <h1>{title}</h1>
        <div className="input-wrapper">
            <input className="input"
                value={value}
                onChange={setValue}
                placeholder={placeHolder}
                type={type}
            />
        </div>
    </div>
    )
}

export default input;