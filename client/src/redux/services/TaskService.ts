import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ITask } from '../models/ITask'


export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/task/' }),
    tagTypes: ['CreateTask', 'DeleteTask'],
    endpoints: (builder) => ({
        fetchDatesByPlaylist: builder.query<Date[], number>({
            query: (idplaylist: number) => ({
                url: 'getDatesByPlaylist/' + idplaylist
            }),
            providesTags: ['CreateTask']
        }),
        fetchTasksByPlaylistAndDate: builder.query<ITask[], { idplaylist: number, date: Date }>({
            query: (params: { idplaylist: number, date: Date }) => ({
                url: `getByDateAndPlaylist/${params.idplaylist}/${params.date}`
            }),
            providesTags: ['DeleteTask']
        }),
        createTask: builder.mutation<ITask, { description: string, task_date: Date, importance: string, iscomplete: boolean, playlist: string }>({
            query: (task: { description: string, task_date: Date, importance: string, iscomplete: boolean, playlist: string }) => ({
                url: 'create',
                method: 'POST',
                body: task
            }),
            invalidatesTags: ['CreateTask']
        }),
        deleteTask: builder.mutation<ITask, number>({
            query: (id: number) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DeleteTask']
        }),
    }),
})