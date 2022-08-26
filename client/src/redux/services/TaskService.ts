import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ITask } from '../models/ITask'


export const taskAPI = createApi({
    reducerPath: 'taskAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/task/' }),
    tagTypes: ['CreateTask', 'DeleteTask', 'UpdateTask'],
    endpoints: (builder) => ({
        fetchDatesByPlaylist: builder.query<Date[], number>({
            query: (idplaylist: number) => ({
                url: 'getDatesByPlaylist/' + idplaylist
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        fetchTasksByPlaylistAndDate: builder.query<ITask[], { idplaylist: number, date: Date }>({
            query: (params: { idplaylist: number, date: Date }) => ({
                url: `getByDateAndPlaylist/${params.idplaylist}/${params.date}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        fetchTasksByDate: builder.query<ITask[], {iduser: number, date: Date}>({
            query: (tasks: {iduser: number, date: Date}) => ({
                url: `getByDate/${tasks.iduser}/${tasks.date}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        createTask: builder.mutation<ITask, { description: string, task_date: Date, importance: string, iscomplete: boolean, playlist: string, iduser: number }>({
            query: (task: { description: string, task_date: Date, importance: string, iscomplete: boolean, playlist: string, iduser: number }) => ({
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
        deleteTasksFromPlaylist: builder.mutation<ITask[], {idplaylist: number}>({
            query: (playlist: {idplaylist: number}) => ({
                url: `deleteFromPlaylist/${playlist.idplaylist}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DeleteTask']
        }),
        updateTask: builder.mutation<ITask, {description: string, task_date: Date, importance: boolean, id: number}>({
            query: (task: {description: string, task_date: Date, importance: boolean, id: number}) => ({
                url: `update`,
                method: 'PUT',
                body: task
            }),
            invalidatesTags: ['UpdateTask']
        }),
        completeTask: builder.mutation<ITask, {id: number}>({
            query: (taskid: {id: number}) => ({
                url: `complete`,
                method: 'PUT',
                body: taskid
            }),
            invalidatesTags: ['UpdateTask']
        }),
        getCompleted: builder.query<number, {iduser: number, period: string}>({
            query: (data: {iduser: number, period: string}) => ({
                url: `getCompleted/${data.iduser}/${data.period}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        getFailed: builder.query<number, {iduser: number, period: string}>({
            query: (data: {iduser: number, period: string}) => ({
                url: `getFailed/${data.iduser}/${data.period}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        getPlaned: builder.query<number, {iduser: number, period: string}>({
            query: (data: {iduser: number, period: string}) => ({
                url: `getPlaned/${data.iduser}/${data.period}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
        getDaysScheduled: builder.query<number, {iduser: number, period: string}>({
            query: (data: {iduser: number, period: string}) => ({
                url: `getDaysScheduled/${data.iduser}/${data.period}`
            }),
            providesTags: ['DeleteTask', 'CreateTask', 'UpdateTask']
        }),
    }),
})