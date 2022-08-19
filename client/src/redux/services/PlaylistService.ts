import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IPlaylist } from '../models/IPlaylist'


export const playlistAPI = createApi({
    reducerPath: 'playlistAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/playlist/' }),
    tagTypes: ['CreatePlaylist'],
    endpoints: (builder) => ({
        fetchUserPlaylists: builder.query<IPlaylist[], number>({
            query: (iduser: number) => ({
                url: 'getAll/' + iduser
            }),
            providesTags: ['CreatePlaylist']
        }),
        fetchPlaylist: builder.query<IPlaylist, number>({
            query: (id: number) => ({
                url: 'get/' + id
            })
        }),
        createPlaylist: builder.mutation<IPlaylist, {name: string, image: string, iduser: number}>({
            query: (playlist: {name: string, image: string, iduser: number}) => ({
                url: 'create',
                method: 'POST',
                body: playlist
            }),
            invalidatesTags: ['CreatePlaylist']
        }),
    }),
})