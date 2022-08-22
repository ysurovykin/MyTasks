import { useNavigate, useParams } from 'react-router-dom'
import '../components/playlistPage/playlistPage.scss'
import PlaylistsDay from '../components/playlist`sDay'
import MobileFooter from '../components/mobileFooter'
import CustomDatePicker from '../components/datePicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import CreateTaskForm from '../components/createTaskForm'
import { playlistAPI } from '../redux/services/PlaylistService'
import { taskAPI } from '../redux/services/TaskService'
import { setPreviousPage } from '../redux/reducers/UserActionCreator'
import { useAppDispatch } from '../redux/hooks/redux'


export function PlaylistPage() {

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const navigate = useNavigate()
    const backToPlaylists = async () => {
        await dispatch(setPreviousPage('playlists'))
        navigate('../', { replace: true })
    }
    const [isCreate, setIsCreate] = useState(false);
    const setIsCreateValue = () => {
        setIsCreate(!isCreate);
    }
    const [startDate, setStartDate] = useState('');
    const [dates, setDates] = useState([]);
    const [isAnyDates, setIsAnyDates] = useState();
    const [isTasksAtDate, setIsTasksAtDate] = useState();
    const { data: playlistData } = playlistAPI.useFetchPlaylistQuery(id)
    const { data: taskData } = taskAPI.useFetchDatesByPlaylistQuery(id)

    const dateSearch = (date) => {
        if (startDate === '') { return true }
        const searchedDate = new Date(startDate);
        const dateSplit = date.split('.');
        const dateSplitDate = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0])
        return searchedDate.getTime() === dateSplitDate.getTime();
    }

    const [searchedTask, isSearchedTask] = useState('');
    const handleSearchedTaskChange = (e) => {
        isSearchedTask(e.target.value);
    }
    const dateSort = (a, b) => {
        const aSplit = a.split('.');
        const bSplit = b.split('.');
        const aDate = new Date(aSplit[2], aSplit[1], aSplit[0])
        const bDate = new Date(bSplit[2], bSplit[1], bSplit[0])
        return aDate.getTime() - bDate.getTime()
    }
    const dateBuilder = (date) => {
        const dateData = new Date(date)
        return dateData.toLocaleDateString()
    }
    useEffect(() => {
        setDates(taskData?.map(({ response }) => response).sort(dateSort))
        setIsAnyDates(!!taskData?.length)
    }, [taskData])
    useEffect(() => {
        setDates(taskData?.map(({ response }) => response).filter(dateSearch).sort(dateSort))
    }, [startDate])
    useEffect(() => {
        setIsTasksAtDate(!!dates?.length)
    }, [dates])
    return (
        <div className="playlist-page-wrapper">
            <div className="playlist-page-wrapper__content">
                <div className='playlist-page-wrapper__header'>
                    <div className='playlist-page-wrapper__head-wrapper'>
                        <h1>{playlistData?.name}</h1>
                    </div>
                    <div className='playlist-page-wrapper__input-wrapper'>
                        <img src="./images/search.png" alt="search" />
                        <input
                            type={'text'}
                            placeholder={'Text to search...'}
                            value={searchedTask}
                            onChange={handleSearchedTaskChange} />
                    </div>
                    <div className='playlist-page-wrapper__calendar'>
                        <img src="./images/calendar.png" alt="search" onClick={() => { setStartDate(''); }} />
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
                {isAnyDates
                    ? <>
                        {!isTasksAtDate
                            ? <h2 className='playlist-page-wrapper__empty-playlist'>No plans at {`${dateBuilder(startDate)}`}</h2>
                            : <div className='playlist-page-wrapper__tasks'>
                                {dates?.map(date => <PlaylistsDay key={date} date={date} id={id} searchedTask={searchedTask} />)}
                            </div>}
                    </>
                    : <h2 className='playlist-page-wrapper__empty-playlist'>Playlist {` \'${playlistData?.name}\' `} is empty</h2>
                }
                <div className='playlist-mobile-whitespace'></div>
            </div>
            <div className='playlist-page-wrapper__bg' style={{ background: `${playlistData?.image}` }}>
            </div>
            {
                isCreate
                    ? <CreateTaskForm setIsCreateValue={setIsCreateValue} playlistName={playlistData?.name} />
                    : null
            }
            <MobileFooter />
        </div >
    )
}