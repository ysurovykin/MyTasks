import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/redux";

function Playlist({title, image, id}) {

    const navigate = useNavigate();
    const {userData} = useAppSelector(state => state.userSlice)
    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('../' + id, {replace: true})
    }

    return(
        <div className={`playlist-wrapper ${userData.theme}`}>
            <h3>{title}</h3>
            <div className="playlist" style={{background: `${image}`}} onClick={handleNavigate}></div>
        </div>
    )
}

export default Playlist;