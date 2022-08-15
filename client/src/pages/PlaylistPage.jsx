import { useNavigate } from 'react-router-dom'
import '../components/playlistPage/playlistPage.scss'
import PlaylistsDay from '../components/playlist`sDay'
import MobileFooter from '../components/mobileFooter'
import CustomDatePicker from '../components/datePicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import CreateTaskForm from '../components/createTaskForm'


export function PlaylistPage() {

    const navigate = useNavigate()
    const backToPlaylists = () => {
        navigate('../main', { replace: true })
    }
    const [isCreate, setIsCreate] = useState(false);
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }
    const [startDate, setStartDate] = useState('');

    return (
        <div className="playlist-page-wrapper">
            <div className="playlist-page-wrapper__content">
                <div className='playlist-page-wrapper__header'>
                    <div className='playlist-page-wrapper__head-wrapper'>
                        <h1>Sportadasdas asdasd</h1>
                    </div>
                    <div className='playlist-page-wrapper__input-wrapper'>
                        <img src="./images/search.png" alt="search" />
                        <input type={'text'} placeholder={'Text to search...'} />
                    </div>
                    <div className='playlist-page-wrapper__calendar'>
                        <img src="./images/calendar.png" alt="search" onClick={() => { setStartDate(''); console.log(startDate) }} />
                        <DatePicker
                            customInput={<CustomDatePicker />}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select" />
                    </div>
                    <div className='playlist-page-wrapper__back-btn' onClick={backToPlaylists}>
                        <h2>Back</h2>
                        <img src="./images/section-arrow.png" alt="arrow" />
                    </div>
                </div>
                <div className='playlist-page-wrapper__create-btn'>
                    <h2 onClick={setIsCreateValue}>Create new task</h2>
                </div>
                <div className='playlist-page-wrapper__tasks'>
                    <PlaylistsDay date={'11.08.2022'} />
                    <PlaylistsDay date={'12.08.2022'} />
                </div>
                <div className='playlist-mobile-whitespace'></div>
            </div>
            <div className='playlist-page-wrapper__bg'>
                <div className='playlist-page-wrapper__bg-fone'></div>
                <div className='playlist-page-wrapper__bg-circle-red'></div>
                <div className='playlist-page-wrapper__bg-circle-green'></div>
                <div className='playlist-page-wrapper__bg-circle-yellow'></div>
            </div>
            {isCreate
                ? <CreateTaskForm setIsCreateValue={setIsCreateValue} playlistName={'Sport'}/>
                : null}
            <MobileFooter />
        </div>
    )
}