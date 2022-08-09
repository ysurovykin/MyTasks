import { useState } from 'react'
import Navbar from '../components/navbar'
import MobileFooter from '../components/mobileFooter'
import TaskDaily from '../components/taskDaily';
import TaskStats from '../components/taskStats';
import TaskPlaylist from '../components/taskPlaylist';
import '../components/mainPage/mainPage.scss'

export function MainPage() {

    const [page, setPage] = useState('stats');

    const switchPages = () => {
        switch (page) {
            case 'stats': return <TaskStats />
            case 'daily': return <TaskDaily />
            case 'playlists': return <TaskPlaylist />
        }
    }

    return (
        <div className='main-page-wrapper'>
            <Navbar page={page} setPage={setPage} />
            {switchPages()}
            <MobileFooter />
        </div>
    )
}