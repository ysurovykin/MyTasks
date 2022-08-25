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
        createPlaylist: builder.mutation<IPlaylist, {name: string, background: string, image: string, iduser: number}>({
            query: (playlist: {name: string, background: string, image: string, iduser: number}) => ({
                url: 'create',
                method: 'POST',
                body: playlist
            }),
            invalidatesTags: ['CreatePlaylist']
        }),
        editPlaylist: builder.mutation<IPlaylist, {name: string, background: string, image: string, id: number}>({
            query: (playlist: {name: string, background: string, image: string, id: number}) => ({
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
    }),
})