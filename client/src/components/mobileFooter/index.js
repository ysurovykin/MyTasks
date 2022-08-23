
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux';
import { changeTheme } from '../../redux/reducers/UserActionCreator';
import './mobileFooter.scss'

function MobileFooter() {
    const { userData } = useAppSelector(state => state.userSlice)
    const [mode, setMode] = useState(userData.theme);
    const dispatch = useAppDispatch();
    const handleChangeMode = async (e) => {
        e.preventDefault();
        try {
            await dispatch(changeTheme({ id: userData.id }));
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        setMode(userData.theme);
    }, [userData.theme])

    return (
        <div className="mobile-footer">
            <svg viewBox="0 0 428 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 74.4774H17.8333C35.6667 74.4774 74.8333 74.4774 110.5 55.2575C146.167 36.0375 179 -0.000337422 214 1.0284e-09C249 1.0284e-09 278.333 40.8425 314 55.2575C346 69.6724 389 74.4774 410.167 74.4774H428V88.8924H410.167C392.333 88.8924 356.667 88.8924 321 88.8924C285.333 88.8924 249.667 88.8924 214 88.8924C178.333 88.8924 142.667 88.8924 107 88.8924C71.3333 88.8924 35.6667 88.8924 17.8333 88.8924H0V74.4774Z" 
                fill={userData.theme === 'light' ? "#E0E0E0" : '#353535'} />
            </svg>
            {
                userData.theme === 'light' ?
                    <svg onClick={handleChangeMode} className='mobile-footer__icon' width="96" height="96" viewBox="0 0 64 64"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        < path d="M30.5735 52.0718L30.3924 52.5378L30.5735 52.0718ZM30.8772 50.1884L30.9896 50.6756L30.8772 50.1884ZM28.8413 51.0199L29.34 51.0559L28.8413 51.0199ZM37.1745 16.5681L36.8927 16.9812L37.1745 16.5681ZM55.5 34.6667C55.5 24.6335 47.3665 16.5 37.3333 16.5V15.5C47.9188 15.5 56.5 24.0812 56.5 34.6667H55.5ZM37.3333 52.8333C47.3665 52.8333 55.5 44.6998 55.5 34.6667H56.5C56.5 45.2521 47.9188 53.8333 37.3333 53.8333V52.8333ZM30.7547 51.6057C32.7939 52.3983 35.0122 52.8333 37.3333 52.8333V53.8333C34.8863 53.8333 32.5453 53.3745 30.3924 52.5378L30.7547 51.6057ZM30.7649 49.7012C38.8245 47.8431 44.8333 40.6219 44.8333 31.9986H45.8333C45.8333 41.0979 39.4929 48.7152 30.9896 50.6756L30.7649 49.7012ZM44.8333 31.9986C44.8333 25.7583 41.6874 20.2526 36.8927 16.9812L37.4563 16.1551C42.5124 19.6049 45.8333 25.4138 45.8333 31.9986H44.8333ZM30.3924 52.5378C29.8214 52.3159 29.3427 52.131 29.0162 51.9508C28.7299 51.7928 28.3051 51.5035 28.3426 50.9839L29.34 51.0559C29.351 50.9046 29.206 50.9134 29.4994 51.0753C29.7525 51.215 30.1532 51.3719 30.7547 51.6057L30.3924 52.5378ZM30.9896 50.6756C30.3051 50.8334 29.8401 50.9416 29.5381 51.0516C29.3871 51.1067 29.3207 51.1473 29.2977 51.166C29.2876 51.1742 29.3343 51.1354 29.34 51.0559L28.3426 50.9839C28.3617 50.7203 28.502 50.5241 28.6669 50.3901C28.8188 50.2666 29.0085 50.1803 29.1957 50.1121C29.5702 49.9756 30.1099 49.8522 30.7649 49.7012L30.9896 50.6756ZM37.3333 16.5C37.3719 16.5 37.4205 16.4855 37.4619 16.4516C37.4997 16.4206 37.5195 16.3837 37.5282 16.3522C37.5454 16.2895 37.5258 16.2026 37.4563 16.1551L36.8927 16.9812C36.5723 16.7626 36.4804 16.3916 36.5638 16.0876C36.6487 15.7784 36.928 15.5 37.3333 15.5V16.5Z"
                            fill="black" />
                        <path d="M11.1026 14.6325L6.84605 16.0513C5.66944 16.4435 5.08114 16.6396 5.08114 17C5.08114 17.3604 5.66944 17.5565 6.84605 17.9487L11.1026 19.3675L11.1026 19.3675C12.0337 19.6779 12.4992 19.8331 12.8331 20.1669C13.1669 20.5008 13.3221 20.9663 13.6325 21.8974L15.0513 26.1539C15.4435 27.3306 15.6396 27.9189 16 27.9189C16.3604 27.9189 16.5565 27.3306 16.9487 26.154L18.3675 21.8974C18.6779 20.9663 18.8331 20.5008 19.1669 20.1669C19.5008 19.8331 19.9663 19.6779 20.8974 19.3675L25.1539 17.9487C26.3306 17.5565 26.9189 17.3604 26.9189 17C26.9189 16.6396 26.3306 16.4435 25.154 16.0513L20.8974 14.6325C19.9663 14.3221 19.5008 14.1669 19.1669 13.8331C18.8331 13.4992 18.6779 13.0337 18.3675 12.1026L18.3675 12.1026L16.9487 7.84605C16.5565 6.66944 16.3604 6.08114 16 6.08114C15.6396 6.08114 15.4435 6.66944 15.0513 7.84605L13.6325 12.1026L13.6325 12.1026C13.3221 13.0337 13.1669 13.4992 12.8331 13.8331C12.4992 14.1669 12.0337 14.3221 11.1026 14.6325L11.1026 14.6325Z"
                            stroke="black" />
                    </svg>
                    :
                    <svg onClick={handleChangeMode} className='mobile-footer__icon' width="96" height="96" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="10.1667" stroke="white" />
                        <path d="M32 13.3333V8" stroke="white" strokeLinecap="round" />
                        <path d="M32 56V50.6666" stroke="white" strokeLinecap="round" />
                        <path d="M45.1995 18.7999L48.9707 15.0287" stroke="white" strokeLinecap="round" />
                        <path d="M15.0295 48.9718L18.8008 45.2006" stroke="white" strokeLinecap="round" />
                        <path d="M50.6667 32L56 32" stroke="white" strokeLinecap="round" />
                        <path d="M7.99998 32L13.3333 32" stroke="white" strokeLinecap="round" />
                        <path d="M45.1995 45.2001L48.9707 48.9713" stroke="white" strokeLinecap="round" />
                        <path d="M15.0295 15.0282L18.8008 18.7994" stroke="white" strokeLinecap="round" />
                    </svg>

            }

        </div >
    )
}

export default MobileFooter;