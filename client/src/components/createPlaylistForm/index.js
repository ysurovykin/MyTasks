import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { playlistAPI } from "../../redux/services/PlaylistService";
import './createPlaylistForm.scss'

function CreatePlaylistForm({ setIsCreateValue }) {
    const [playlistInput, setPlaylistInput] = useState('');
    const [gradient, setGradient] = useState('');
    const [createPlaylist, { }] = playlistAPI.useCreatePlaylistMutation();
    const { userData } = useAppSelector(state => state.userSlice)

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
    const [uploadImage, { }] = playlistAPI.useUploadImageMutation();
    const [imageData, setImageData] = useState();
    const onChangeImage = (e) => {
        setImageData(e.target.files[0]);
    }
    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            const newPlaylist = await createPlaylist({ name: playlistInput, image: null, background: gradient, iduser: userData.id })
            if (!!imageData) {
                const data = new FormData()
                data.append('image', imageData)
                await axios.put(`http://localhost:5000/api/playlist/uploadImage/${newPlaylist.data.id}`, data)
            }
            setIsCreateValue();
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        generateGradient();
    }, [])

    return (
        <div className={`create-playlist-form-wrapper ${userData.theme}`}>
            <div className={`create-playlist-form ${userData.theme}`}>
                <div className='album-form-input'>
                    <div className="album-wrapper" style={{ background: `${gradient}` }}></div>
                    <button className='generate-btn' onClick={generateGradient}>Generate background gradient</button>
                    <label id="upload-lable" htmlFor="upload-image">Upload Image</label>
                    <input onChange={onChangeImage} type="file" name="image" id="upload-image" />
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
                <div className={`playlist-form-buttons ${userData.theme}`}>
                    <button className='create-btn' onClick={handleCreatePlaylist}>Create</button>
                    <button className='cancel-btn' onClick={cancelCreate}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default CreatePlaylistForm