
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/redux";


function Playlist({ title, image, id, background, setIsEditValue, setIsDeleteValue }) {

    const navigate = useNavigate();
    const { userData } = useAppSelector(state => state.userSlice)
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('../' + id, { replace: true })
    }


    return (
        <div className={`playlist-wrapper ${userData.theme}`}>
            <div className="playlist-header">
                <h3>{title}</h3>
                <div className="playlist-btn-wrapper">
                    <img onClick={() => setIsEditValue(id)} className="playlist-btn" src={userData.theme === 'light' ? './images/edit32x32.png' : './images/edit32x32-light.png'} alt='trash' />
                    <img onClick={() => setIsDeleteValue(id)} className="playlist-btn" src={userData.theme === 'light' ? './images/trash-bin.png' : './images/trash-bin-light.png'} alt='trash' />
                </div>
            </div>
            <div className="playlist" style={{ background: `${image ? image : background}` }} onClick={handleNavigate}></div>
        </div>
    )
}

export default Playlist;