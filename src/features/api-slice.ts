import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { NewTask, Task, TaskQuery, TestOcelotMsg } from '../models';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8001/', //5246
        prepareHeaders(headers){
            headers.set('Content-Type', 'application/json; charset=utf-8');    
            return headers;
        }        
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({         
            getTasks: builder.query<Task[], TaskQuery>({                
                query: (taskQuery)=> {
                    return {url: '/api/task',
                    params: {tasktype: taskQuery.TaskType, priority: taskQuery.Priority, completed: taskQuery.Completed }}
                },
                providesTags: ['Tasks']  
            }),
            addTasks: builder.mutation({
                query: (task) =>({
                    url: '/api/task',
                    method: 'POST',
                    body: task
                }),
                invalidatesTags: ['Tasks']  
            }),
            updateTasks: builder.mutation({
                query: (task:Task) =>({
                    url: `/api/task/${task.Id}`,
                    method: 'PUT',
                    body: JSON.stringify(task)
                }),
                invalidatesTags: ['Tasks']  
            }),
            deleteTasks: builder.mutation({
                query: (id) =>({
                    url: `/api/task/${id}`,
                    method: 'DELETE',
                    body: id
                }),
                invalidatesTags: ['Tasks']  
            }),
            setTaskAsCompleted: builder.mutation({
                query: (id) =>({
                    url: `/api/task/${id}/setCompleted`,
                    method: 'PUT',
                    body: id
                }),
                invalidatesTags: ['Tasks']  
            }),
            deleteAllCompletedTasks: builder.mutation({
                query: () =>({
                    url: `/api/task/deleteAllCompleted`,
                    method: 'PUT'
                }),
                invalidatesTags: ['Tasks']  
            }),
            testOcelot: builder.query<TestOcelotMsg, void>({                
                query: ()=> '/testOcelot',
                providesTags: ['Tasks']  
            }),
    })
})

export const { 
    useGetTasksQuery, 
    useAddTasksMutation, 
    useUpdateTasksMutation, 
    useDeleteTasksMutation, 
    useSetTaskAsCompletedMutation, 
    useDeleteAllCompletedTasksMutation,
    useTestOcelotQuery  } = apiSlice;