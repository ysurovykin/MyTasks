import { useNavigate } from "react-router-dom";

function Playlist({title, image, id}) {

    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();
        navigate('../' + id, {replace: true})
    }

    return(
        <div className="playlist-wrapper">
            <h3>{title}</h3>
            <div className="playlist" style={{background: `${image}`}} onClick={handleNavigate}></div>
        </div>
    )
}

export default Playlist;