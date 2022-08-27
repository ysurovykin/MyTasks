import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IPlaylist } from '../models/IPlaylist'


export const playlistAPI = createApi({
    reducerPath: 'playlistAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/playlist/' }),
    tagTypes: ['CreatePlaylist', 'UpdatePlaylist', 'DeletePlaylist'],
    endpoints: (builder) => ({
        fetchUserPlaylists: builder.query<IPlaylist[], number>({
            query: (iduser: number) => ({
                url: 'getAll/' + iduser
            }),
            providesTags: ['CreatePlaylist', 'UpdatePlaylist', 'DeletePlaylist']
        }),
        fetchPlaylist: builder.query<IPlaylist, number>({
            query: (id: number) => ({
                url: 'get/' + id
            }),
            providesTags: ['CreatePlaylist', 'UpdatePlaylist', 'DeletePlaylist']
        }),
        createPlaylist: builder.mutation<IPlaylist, {data: FormData}>({
            query: (data: {data: FormData}) => ({
                url: 'create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CreatePlaylist']
        }),
        editPlaylist: builder.mutation<IPlaylist, {name: string, background: string, id: number}>({
            query: (playlist: {name: string, background: string, id: number}) => ({
                url: 'update',
                method: 'PUT',
                body: playlist
            }),
            invalidatesTags: ['UpdatePlaylist']
        }),
        deletePlaylist: builder.mutation<IPlaylist, {id: number}>({
            query: (playlist: {id: number}) => ({
                url: `delete/${playlist.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DeletePlaylist']
        }),
        uploadImage: builder.mutation<IPlaylist, {image: FormData, idplaylist: number}>({
            query: (data:  {image: FormData, idplaylist: number}) => ({
                url: `uploadImage/${data.idplaylist}`,
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data; boundary=XXX'},
                body: data.image,
            }),
            invalidatesTags: ['UpdatePlaylist']
        }),
    }),
})