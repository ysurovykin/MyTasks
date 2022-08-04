import './helloPageWaves.scss'

function HelloPageWaves() {
    return (
        <div className="hello-page">
            <div className='hello-page__wave_top'>
                <svg viewBox="0 0 1540 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 30V92.3333C64.1667 102.333 256.667 70 385 100C513.333 130 629.903 173.667 758.236 178.667C886.569 183.667 894.59 150 1171.04 218.667C1299.37 233.667 1411.67 240 1475.83 270L1540 300V0H1475.83C1411.67 0 1283.33 0 1155 0C1026.67 0 898.333 0 770 0C641.667 0 513.333 0 385 0C256.667 0 128.333 0 64.1667 0H0V30Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <div className='hello-page__img-wrapper'>
                    <img className='cover-image' src='./images/strategy.png'></img>
                </div>
            </div>
            <div className='hello-page__content'>
                <h1>Hello, scheduler</h1>
                <h2>Your first task right here!</h2>
                <button className='button' id='reg-btn'>REGISTRATION</button>
                <button className='button' id='log-btn'>LOGIN</button>
                <div className='hello-page__reg-arrow-wrapper'>
                    <img className='cover-image' src='./images/RegArrow.png'></img>
                </div>
                <div className='hello-page__log-arrow-wrapper'>
                    <img className='cover-image' src='./images/LogArrow.png'></img>
                </div>
            </div>
            <div className='hello-page__wave_bot'>
                <svg viewBox="0 0 1540 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L42.35 5C85.9833 10 170.683 20 256.667 25C342.65 30 427.35 30 513.333 65C599.317 100 684.017 170 770 175C855.983 180 940.683 120 1026.67 130C1112.65 140 1197.35 220 1283.33 240C1369.32 260 1454.02 220 1497.65 200L1540 180V300H1497.65C1454.02 300 1369.32 300 1283.33 300C1197.35 300 1112.65 300 1026.67 300C940.683 300 855.983 300 770 300C684.017 300 599.317 300 513.333 300C427.35 300 342.65 300 256.667 300C170.683 300 85.9833 300 42.35 300H0V0Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <div className='hello-page__img-wrapper'>
                    <img className='cover-image' src='./images/done.png'></img>
                </div>
            </div>
        </div>
    )
}

export default HelloPageWaves;