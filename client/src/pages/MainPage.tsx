import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import MobileFooter from '../components/mobileFooter'
import TaskDaily from '../components/taskDaily';
import TaskStats from '../components/taskStats';
import TaskPlaylist from '../components/taskPlaylist';
import '../components/mainPage/mainPage.scss'
import {useAppSelector } from '../redux/hooks/redux';

export function MainPage() {


    const {userData} = useAppSelector(state => state.userSlice)
    const { currentPage } = useAppSelector(state => state.userSlice)
    const [page, setPage] = useState(currentPage);
    const switchPages = () => {
        switch (page) {
            case 'stats': return <TaskStats />
            case 'daily': return <TaskDaily />
            case 'playlists': return <TaskPlaylist />
        }
    }

    return (
        <div className={`main-page-wrapper ${userData.theme}`}>
            <Navbar page={page} setPage={setPage} />
            {switchPages()}
            <MobileFooter />
        </div>
    )
}