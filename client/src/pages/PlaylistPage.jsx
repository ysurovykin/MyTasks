import { useNavigate } from 'react-router-dom'
import '../components/playlistPage/playlistPage.scss'
import PlaylistsDay from '../components/playlist`sDay'
import MobileFooter from '../components/mobileFooter'
import CustomDatePicker from '../components/datePicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'


export function PlaylistPage() {

    const navigate = useNavigate()
    const backToPlaylists = () => {
        navigate('../main', { replace: true })
    }

    const [startDate, setStartDate] = useState('');
    const [playlistInput, setPlaylistInput] = useState('Sport');
    const [taskInput, setTaskInput] = useState('');
    const [isCreate, setIsCreate] = useState(false);

    const setPlaylistValue = (e) => {
        setPlaylistInput(e.target.value);
    }
    const setTaskValue = (e) => {
        setTaskInput(e.target.value);
    }
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }
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
                ? <div className='playlist-page-wrapper__create-form-wrapper'>
                    <div className='playlist-page-wrapper__create-form'>
                        <div className='playlist-page-wrapper__form-input'>
                            <h2>What playlist does this task belong to?</h2>
                            <div className="playlist-page-wrapper__input-wrapper">
                                <input className="playlist-page-wrapper__input"
                                    value={playlistInput}
                                    onChange={setPlaylistValue}
                                    placeholder={'Tasks 007'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                        <div className='playlist-page-wrapper__form-input'>
                            <h2>What should you do?</h2>
                            <div className="playlist-page-wrapper__input-wrapper">
                                <input className="playlist-page-wrapper__input"
                                    value={taskInput}
                                    onChange={setTaskValue}
                                    placeholder={'I should be James Bond'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                        <div className='playlist-page-wrapper__form-input'>
                            <h2>When should you do this task?</h2>
                            <div className="playlist-page-wrapper__input-wrapper">
                                <input className="playlist-page-wrapper__input"
                                    type={'date'}
                                    min={new Date().toISOString().split('T')[0]}
                                    onKeyDown={(e) => e.preventDefault()}
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                        <div className='playlist-page-wrapper__form-input'>
                            <h2>Choose the priority for this task</h2>
                            <div className="playlist-page-wrapper__input-wrapper playlist-page-wrapper__circle-wrapper">
                                <div className='playlist-page-wrapper__importance-wrapper'>
                                    <div className="playlist-page-wrapper__form-circle red-circle"
                                    // style={{ border: '1px solid black' }}
                                    ></div>
                                    <h3>High</h3>
                                </div>
                                <div className='playlist-page-wrapper__importance-wrapper'>
                                    <div className="playlist-page-wrapper__form-circle yellow-circle"
                                    // style={{ border: '1px solid black' }}
                                    ></div>
                                    <h3>Medium</h3>
                                </div>
                                <div className='playlist-page-wrapper__importance-wrapper'>
                                    <div className="playlist-page-wrapper__form-circle green-circle"
                                        style={{ border: '1px solid black' }}></div>
                                    <h3>Low</h3>
                                </div>
                            </div>
                        </div>
                        <div className='playlist-page-wrapper__form-buttons'>
                            <button className='playlist-page-wrapper__create-btn'>Create</button>
                            <button className='playlist-page-wrapper__cancel-btn' onClick={setIsCreateValue}>Cancel</button>
                        </div>
                    </div>
                </div>
                : null}
            <MobileFooter />
        </div>
    )
}