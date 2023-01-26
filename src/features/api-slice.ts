import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { NewTask, Task, TaskQuery } from '../models';



export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7214/api',
        prepareHeaders(headers){
            headers.set('Content-Type', 'application/json; charset=utf-8');
            return headers;
        }        
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({         
            getTasks: builder.query<Task[], TaskQuery>({                
                query: (taskQuery)=> {
                    return {url: '/task',
                    params: {tasktype: taskQuery.TaskType, priority: taskQuery.Priority, completed: taskQuery.Completed }}
                },
                providesTags: ['Tasks']  
            }),
            addTasks: builder.mutation({
                query: (task) =>({
                    url: '/task',
                    method: 'POST',
                    body: task
                }),
                invalidatesTags: ['Tasks']  
            }),
            updateTasks: builder.mutation({
                query: (task:Task) =>({
                    url: `/task/${task.Id}`,
                    method: 'PUT',
                    body: JSON.stringify(task)
                }),
                invalidatesTags: ['Tasks']  
            }),
            deleteTasks: builder.mutation({
                query: (id) =>({
                    url: `/task/${id}`,
                    method: 'DELETE',
                    body: id
                }),
                invalidatesTags: ['Tasks']  
            }),
            setTaskAsCompleted: builder.mutation({
                query: (id) =>({
                    url: `/task/${id}/setCompleted`,
                    method: 'PUT',
                    body: id
                }),
                invalidatesTags: ['Tasks']  
            }),
            deleteAllCompletedTasks: builder.mutation({
                query: () =>({
                    url: `/task/deleteAllCompleted`,
                    method: 'PUT'
                }),
                invalidatesTags: ['Tasks']  
            })   
    })
})

export const { 
    useGetTasksQuery, 
    useAddTasksMutation, 
    useUpdateTasksMutation, 
    useDeleteTasksMutation, 
    useSetTaskAsCompletedMutation, 
    useDeleteAllCompletedTasksMutation } = apiSlice;