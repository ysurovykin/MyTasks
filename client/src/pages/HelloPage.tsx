import "../components/helloPageWaves/helloPage.scss";

export function HelloPage() {
    return (
        <div className="hello-page">
            <div className='hello-page__wave_top'>
                <svg className="hello-page__wave_smallDevices" width="760" height="127" viewBox="0 0 760 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M760 105.605L741.633 111.583C723.9 117.561 687.8 129.517 651.7 126.528C614.967 123.539 578.867 105.605 542.767 87.6708C506.667 69.7366 470.567 51.8025 434.467 42.8354C398.367 33.8683 361.633 33.8683 325.533 48.8135C289.433 63.7586 253.333 93.6489 217.233 108.594C181.133 123.539 145.033 123.539 108.3 117.561C72.2 111.583 36.1 99.6269 18.3667 93.6489L9.53674e-06 87.6708V-2H18.3667C36.1 -2 72.2 -2 108.3 -2C145.033 -2 181.133 -2 217.233 -2C253.333 -2 289.433 -2 325.533 -2C361.633 -2 398.367 -2 434.467 -2C470.567 -2 506.667 -2 542.767 -2C578.867 -2 614.967 -2 651.7 -2C687.8 -2 723.9 -2 741.633 -2H760V105.605Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <svg className="hello-page__wave_bigDevices" viewBox="0 0 1540 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 30V92.3333C64.1667 102.333 256.667 70 385 100C513.333 130 629.903 173.667 758.236 178.667C886.569 183.667 894.59 150 1171.04 218.667C1299.37 233.667 1411.67 240 1475.83 270L1540 300V0H1475.83C1411.67 0 1283.33 0 1155 0C1026.67 0 898.333 0 770 0C641.667 0 513.333 0 385 0C256.667 0 128.333 0 64.1667 0H0V30Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <div className='hello-page__img-wrapper'>
                    <img className='hello-page__cover-image_bigDevices' src='./images/strategy.png'></img>
                </div>
            </div>
            <div className='hello-page__content'>
                <h1>Hello, scheduler</h1>
                <h2>Your first task right here!</h2>
                <button className='button' id='reg-btn'>REGISTRATION</button>
                <button className='button' id='log-btn'>LOGIN</button>
                <div className='hello-page__img-wrapper_smallDevices'>
                    <img className='hello-page__cover-image_smallDevices' src='./images/smartPhone.png'></img>
                </div>
                <div className='hello-page__reg-arrow-wrapper'>
                    <img className='hello-page__cover-image_bigDevices' src='./images/RegArrowBD.png'></img>
                    <img className='hello-page__cover-image_smallDevices' src='./images/RegArrowSD.png'></img>
                </div>
                <div className='hello-page__log-arrow-wrapper'>
                    <img className='hello-page__cover-image_bigDevices' src='./images/LogArrowBD.png'></img>
                    <img className='hello-page__cover-image_smallDevices' src='./images/LogArrowSD.png'></img>
                </div>
            </div>
            <div className='hello-page__wave_bot'>
                <svg className="hello-page__wave_smallDevices" width="760" height="229" viewBox="0 0 760 229" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L24.8598 33.0778C51.4953 66.1556 101.215 132.311 152.71 119.589C202.43 109.411 253.925 22.9 303.645 17.8111C355.14 12.7222 404.86 89.0556 456.355 132.311C506.075 175.567 557.57 185.744 607.29 157.756C658.785 132.311 708.505 66.1556 735.14 33.0778L760 0V229H735.14C708.505 229 658.785 229 607.29 229C557.57 229 506.075 229 456.355 229C404.86 229 355.14 229 303.645 229C253.925 229 202.43 229 152.71 229C101.215 229 51.4953 229 24.8598 229H0V0Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <svg className="hello-page__wave_bigDevices" viewBox="0 0 1540 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L42.35 5C85.9833 10 170.683 20 256.667 25C342.65 30 427.35 30 513.333 65C599.317 100 684.017 170 770 175C855.983 180 940.683 120 1026.67 130C1112.65 140 1197.35 220 1283.33 240C1369.32 260 1454.02 220 1497.65 200L1540 180V300H1497.65C1454.02 300 1369.32 300 1283.33 300C1197.35 300 1112.65 300 1026.67 300C940.683 300 855.983 300 770 300C684.017 300 599.317 300 513.333 300C427.35 300 342.65 300 256.667 300C170.683 300 85.9833 300 42.35 300H0V0Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <div className='hello-page__img-wrapper'>
                    <img className='hello-page__cover-image_bigDevices' src='./images/done.png'></img>
                </div>
            </div>
        </div>
    )
}