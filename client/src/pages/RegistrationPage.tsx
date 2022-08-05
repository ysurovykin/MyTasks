import { useState } from 'react';
import MyInput from '../components/input';
import '../components/regPage/regPage.scss'

export function RegistrationPage() {
    const [inputValue, setInputValue] = useState('');

    const setValue = (e: any) => {
        setInputValue(e.target.value);
    }
    return (
        <div className='reg-page'>
            <div className='reg-page__wave_left'>
                <svg className="reg-page__wave_bigDevices" viewBox="0 0 450 740" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M412.502 0L423.96 30.8333C435.419 61.6667 458.335 123.333 446.877 185C435.419 246.667 389.585 308.333 343.752 370C297.918 431.667 252.085 493.333 263.543 555C275.001 616.667 343.752 678.333 378.127 709.167L412.502 740L-1.24359e-05 740V709.167C-1.24359e-05 678.333 -1.24359e-05 616.667 -1.24359e-05 555C-1.24359e-05 493.333 -1.24359e-05 431.667 -1.24359e-05 370C-1.24359e-05 308.333 -1.24359e-05 246.667 -1.24359e-05 185C-1.24359e-05 123.333 -1.24359e-05 61.6667 -1.24359e-05 30.8333V0L412.502 0Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <svg className="reg-page__wave_smallDevices" viewBox="0 0 760 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M760 134L728.037 118.235C696.075 101.157 633.925 67 570 67C506.075 67 443.925 101.157 380 98.5294C316.075 95.902 253.925 56.4902 190 53.8627C126.075 49.9216 63.9252 84.0784 31.9626 101.157L3.33786e-06 118.235V1.90735e-06H31.9626C63.9252 1.90735e-06 126.075 1.90735e-06 190 1.90735e-06C253.925 1.90735e-06 316.075 1.90735e-06 380 1.90735e-06C443.925 1.90735e-06 506.075 1.90735e-06 570 1.90735e-06C633.925 1.90735e-06 696.075 1.90735e-06 728.037 1.90735e-06H760V134Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>

                <div className='reg-page__img-wrapper'>
                    <img className='reg-page__cover-image_bigDevices' src='./images/human-circle.png' alt="human-circle"></img>
                </div>
            </div>
            <div className='reg-page__content'>
                <h1 id='reg-page__h1'>Let us make you</h1>
                <h2 id='reg-page__h2'>part of our community</h2>
                <h3 id='reg-page__h3'>Already have an account?</h3>
                <form>
                    <MyInput id={'reg-page__name-input'} title={'Tell us your name'} value={inputValue} setValue={setValue} type={'text'} placeHolder={'James Bond'} />
                    <MyInput id={'reg-page__email-input'} title={'Enter your email'} value={inputValue} setValue={setValue} type={'text'} placeHolder={'james_bond_007@gmail.com'} />
                    <MyInput id={'reg-page__password-input'} title={'Create a secret password'} value={inputValue} setValue={setValue} type={'password'} placeHolder={'******'} />
                    <button type={'submit'} className='reg-page__button' id='reg-btn'>SIGN UP</button>
                </form>
            </div>
            <div className='reg-page__wave_right'>
                <svg className="reg-page__wave_bigDevices" viewBox="0 0 450 740" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M76.2404 740L49.5433 709.167C22.8462 678.333 -30.548 616.667 22.8462 555C76.2404 493.333 226.768 420.827 306.86 359.16C361.28 317.259 417.988 214.99 362.195 134.053C306.402 53.1152 225.457 39.3848 114.787 15.5371L22.8462 0H450V30.8333C450 61.6666 450 123.333 450 185C450 246.667 450 308.333 450 370C450 431.667 450 493.333 450 555C450 616.667 450 678.333 450 709.167V740H76.2404Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <svg className="reg-page__wave_smallDevices" viewBox="0 0 760 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 21.0633L18.3667 15.178C36.1 9.29258 72.2 -2.47816 108.3 0.464528C145.033 3.40721 181.133 21.0633 217.233 38.7194C253.333 56.3756 289.433 74.0317 325.533 82.8597C361.633 91.6878 398.367 91.6878 434.467 76.9743C470.567 62.2609 506.667 32.8341 542.767 18.1206C578.867 3.40721 614.967 3.40721 651.7 9.29258C687.8 15.178 723.9 26.9487 741.633 32.8341L760 38.7194V127H741.633C723.9 127 687.8 127 651.7 127C614.967 127 578.867 127 542.767 127C506.667 127 470.567 127 434.467 127C398.367 127 361.633 127 325.533 127C289.433 127 253.333 127 217.233 127C181.133 127 145.033 127 108.3 127C72.2 127 36.1 127 18.3667 127H0L0 21.0633Z" fill="#0099FF" fill-opacity="0.3" />
                </svg>
                <div className='reg-page__img-wrapper'>
                    <img className='reg-page__cover-image_bigDevices' src='./images/team-brainstorming.png' alt="team-brainstorming"></img>
                </div>
            </div>
        </div>
    )
}
