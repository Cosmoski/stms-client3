import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from '../features/api-slice';

export const store = configureStore({    
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware);
    },
});


