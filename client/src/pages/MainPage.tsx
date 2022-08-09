import { useState } from 'react'
import Navbar from '../components/navbar'
import TaskDaily from '../components/taskDaily';
import TaskStats from '../components/taskStats';
import TaskPlaylist from '../components/taskPlaylist';

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
        <div style={{display: 'flex'}}>
            <Navbar page={page} setPage={setPage}/>
            {switchPages()}
        </div>
    )
}