import { useEffect, useState } from "react";
import './createPlaylistForm.scss'

function CreatePlaylistForm({ setIsCreateValue }) {
    const [playlistInput, setPlaylistInput] = useState('')
    const [gradient, setGradient] = useState('')

    const setPlaylistValue = (e) => {
        setPlaylistInput(e.target.value);
    }
    const cancelCreate = () => {
        setIsCreateValue();
        setPlaylistInput('')
    }

    const hexString = "0123456789abcdef";
    const randomColor = () => {
        let hexCode = "#";
        for (let i = 0; i < 6; i++) {
            hexCode += hexString[Math.floor(Math.random() * hexString.length)];
        }
        return hexCode;
    }
    const generateGradient = () => {
        const colorTwo = randomColor();
        const colorOne = randomColor();
        const angle = Math.floor(Math.random() * 360);
        setGradient(`linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`);
    }

    useEffect(() =>{
        generateGradient();
    }, [])

    return (
        <div className='create-playlist-form-wrapper'>
            <div className='create-playlist-form'>
                <div className='album-form-input'>
                    <div className="album-wrapper" style={{ background: `${gradient}` }}></div>
                    <button className='generate-btn' onClick={generateGradient}>Generate gradient</button>
                    <button className='upload-btn'>Upload image</button>
                </div>
                <div className='playlist-form-input'>
                    <h2>Name this playlist</h2>
                    <div className="playlist-input-wrapper">
                        <input className="playlist-input"
                            value={playlistInput}
                            onChange={setPlaylistValue}
                            placeholder={'Tasks 007'}
                            type={'text'}
                        />
                    </div>
                </div>
                <div className='playlist-form-buttons'>
                    <button className='create-btn'>Create</button>
                    <button className='cancel-btn' onClick={cancelCreate}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default CreatePlaylistForm