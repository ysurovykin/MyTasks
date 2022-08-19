import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInput from '../components/input';
import '../components/logPage/logPage.scss'
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux';
import { login } from '../redux/reducers/UserActionCreator';

export function LoginPage() {
    const navigate = useNavigate()

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const setEmailValue = (e: any) => {
        setEmailInput(e.target.value);
    }
    const setPasswordValue = (e: any) => {
        setPasswordInput(e.target.value);
    }
    const navigateToRegistration = () => {
        navigate("../registration", { replace: true });
    }

    const dispatch = useAppDispatch();

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            await dispatch(login({ email: emailInput, password: passwordInput }))
            navigate("../", {replace: true})
        }
        catch(error){

        }
    }

    return (
        <div className='log-page'>
            <div className='log-page__wave_left'>
                <svg className="log-page__wave_bigDevices" viewBox="0 0 394 760" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M78.7272 0L125.949 31.6667C131.824 32.7799 173.268 82.8776 166.708 146.211C160.147 209.544 127.344 291.061 166.708 354.395C206.071 417.728 283.55 470.671 342.595 534.004C401.641 597.337 393.636 696.667 393.636 728.333V760H-5.67093e-06V728.333C-5.67093e-06 696.667 -5.67093e-06 633.333 -5.67093e-06 570C-5.67093e-06 506.667 -5.67093e-06 443.333 -5.67093e-06 380C-5.67093e-06 316.667 -5.67093e-06 253.333 -5.67093e-06 190C-5.67093e-06 126.667 -5.67093e-06 63.3333 -5.67093e-06 31.6667V0L78.7272 0Z" fill="#0099FF" fillOpacity="0.3" />
                </svg>
                <svg className="log-page__wave_smallDevices" viewBox="0 0 760 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M760 134L728.037 118.235C696.075 101.157 633.925 67 570 67C506.075 67 443.925 101.157 380 98.5294C316.075 95.902 253.925 56.4902 190 53.8627C126.075 49.9216 63.9252 84.0784 31.9626 101.157L3.33786e-06 118.235V1.90735e-06H31.9626C63.9252 1.90735e-06 126.075 1.90735e-06 190 1.90735e-06C253.925 1.90735e-06 316.075 1.90735e-06 380 1.90735e-06C443.925 1.90735e-06 506.075 1.90735e-06 570 1.90735e-06C633.925 1.90735e-06 696.075 1.90735e-06 728.037 1.90735e-06H760V134Z" fill="#0099FF" fillOpacity="0.3" />
                </svg>
                <div className='log-page__img-wrapper'>
                    <img className='log-page__cover-image_bigDevices' src='./images/high-five.png' alt="human-circle"></img>
                </div>
            </div>
            <div className='log-page__content'>
                <h1 className='log-page__h1'>Happy to see you</h1>
                <h2 className='log-page__h2_first'>It`s time to start</h2>
                <h2 className='log-page__h2_second'>making big plans</h2>
                <h3 className='log-page__h3' onClick={navigateToRegistration}><span>Still don`t have an account?</span></h3>
                <form>
                    <MyInput id={'log-page__email-input'} title={'Enter your email'} value={emailInput} setValue={setEmailValue} type={'text'} placeHolder={'james_bond_007@gmail.com'} />
                    <MyInput id={'log-page__password-input'} title={'Enter your password'} value={passwordInput} setValue={setPasswordValue} type={'password'} placeHolder={'******'} />
                    <button type={'submit'} className='log-page__button' id='log-btn' onClick={handleLogin}>SIGN IN</button>
                </form>
            </div>
            <div className='log-page__wave_right'>
                <svg className="log-page__wave_bigDevices" viewBox="0 0 400 760" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M306.341 760L282.927 739.1C259.512 717.567 212.683 675.767 212.683 633.333C212.683 590.9 259.512 549.1 267.317 506.667C275.122 464.233 243.902 422.433 197.073 380C150.244 337.567 87.8049 295.767 48.7805 253.333C9.7561 210.9 -5.85366 169.1 1.95122 126.667C9.7561 84.2333 40.9756 42.4333 56.5854 20.9L72.1951 9.53674e-06H400V20.9C400 42.4333 400 84.2333 400 126.667C400 169.1 400 210.9 400 253.333C400 295.767 400 337.567 400 380C400 422.433 400 464.233 400 506.667C400 549.1 400 590.9 400 633.333C400 675.767 400 717.567 400 739.1V760H306.341Z" fill="#0099FF" fillOpacity="0.3" />
                </svg>
                <svg className="log-page__wave_smallDevices" viewBox="0 0 760 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 21.0633L18.3667 15.178C36.1 9.29258 72.2 -2.47816 108.3 0.464528C145.033 3.40721 181.133 21.0633 217.233 38.7194C253.333 56.3756 289.433 74.0317 325.533 82.8597C361.633 91.6878 398.367 91.6878 434.467 76.9743C470.567 62.2609 506.667 32.8341 542.767 18.1206C578.867 3.40721 614.967 3.40721 651.7 9.29258C687.8 15.178 723.9 26.9487 741.633 32.8341L760 38.7194V127H741.633C723.9 127 687.8 127 651.7 127C614.967 127 578.867 127 542.767 127C506.667 127 470.567 127 434.467 127C398.367 127 361.633 127 325.533 127C289.433 127 253.333 127 217.233 127C181.133 127 145.033 127 108.3 127C72.2 127 36.1 127 18.3667 127H0L0 21.0633Z" fill="#0099FF" fillOpacity="0.3" />
                </svg>
                <div className='log-page__img-wrapper'>
                    <img className='log-page__cover-image_bigDevices' src='./images/bulb.png' alt="team-brainstorming"></img>
                </div>
            </div>
        </div>
    )
}
