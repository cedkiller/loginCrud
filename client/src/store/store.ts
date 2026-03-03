import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import crudSlice from './slice/crudSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        crud: crudSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 