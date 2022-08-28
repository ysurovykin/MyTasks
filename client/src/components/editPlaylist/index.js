import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { playlistAPI } from "../../redux/services/PlaylistService";
import './editPlaylistForm.scss'
import { useForm } from 'react-hook-form'

function EditPlaylistForm({ setIsEditValue, editingPlaylist }) {
    const { data: playlistData } = playlistAPI.useFetchPlaylistQuery(editingPlaylist)
    const [gradient, setGradient] = useState('');
    const [editPlaylist, { }] = playlistAPI.useEditPlaylistMutation();
    const [deletePlaylistImage, { }] = playlistAPI.useDeletePlaylistImageMutation();
    const [playlistInput, setPlaylistInput] = useState('');
    const [isCorrectPlaylist, setIsCorrectPlaylist] = useState(true);


    const handlePlaylistInput = (e) => {
        setIsCorrectPlaylist(true)
        setPlaylistInput(e.target.value)
    }
    const { userData } = useAppSelector(state => state.userSlice)

    const cancelEdit = () => {
        setIsEditValue();
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
    const [imageData, setImageData] = useState();

    const onChangeImage = (e) => {
        setImageData(e.target.files[0]);
    }
    const handleEditPlaylist = async (e) => {
        e.preventDefault();
        try {
            const response = await editPlaylist({ name: playlistInput, background: gradient, id: playlistData?.id })

            if (!!response.error) {
                setIsCorrectPlaylist(false);
            } else {
                setIsCorrectPlaylist(true);
                if (!!imageData) {
                    const data = new FormData()
                    data.append('image', imageData)
                    await axios.put(`http://localhost:5000/api/playlist/uploadImage/${playlistData?.id}`, data)
                }
                setIsEditValue();
            }
        } catch (e) {
            console.log(e.message)
        }
    }
    const handleDeletePlaylistImage = async (e) => {
        e.preventDefault();
        try {
            await deletePlaylistImage({ idplaylist: playlistData?.id })
            setIsEditValue();
        } catch (e) {
            console.log(e.message)
        }
    }
    useEffect(() => {
        setGradient(playlistData?.background)
        setPlaylistInput(playlistData?.name)
    }, [playlistData])


    const { register, formState: { errors, isValid } } = useForm({ mode: "onBlur" });

    return (
        <div className={`edit-playlist-form-wrapper ${userData.theme}`}>
            <div className={`edit-playlist-form ${userData.theme}`}>
                <div className='album-form-input'>
                    <div className="album-wrapper" style={{ background: `${gradient}` }}></div>
                    <button className='generate-btn' onClick={generateGradient}>Generate background gradient</button>
                    <label id="upload-lable" htmlFor="upload-image">Upload Image</label>
                    <button className='delete-btn' onClick={handleDeletePlaylistImage}>Delete Image</button>
                    <input onChange={onChangeImage} type="file" name="image" id="upload-image" />
                </div>
                <div className='playlist-form-input'>
                    <h2>Name of the playlist</h2>
                    <div className="playlist-input-wrapper">
                        <input className={!errors.playlistName ? "playlist-input" : "playlist-input with-errors"}
                            value={playlistInput}
                            placeholder={'Tasks 007'}
                            type={'text'}
                            autoFocus
                            {...register('playlistName', { required: 'Enter playlist name' })}
                            onChange={handlePlaylistInput}
                        />
                    </div>
                    {errors.playlistName
                        ? <p>Enter playlist name</p>
                        : isCorrectPlaylist
                            ? null
                            : <h4>Playlist with such name already exists</h4>}
                </div>
                <div className={`playlist-form-buttons ${userData.theme}`}>
                    <button className='edit-btn' disabled={!isValid} onClick={handleEditPlaylist}>Update</button>
                    <button className='cancel-btn' onClick={cancelEdit}>Cancel</button>
                </div>
            </div>
        </div >
    )
}


export default EditPlaylistForm