import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './reducer/sidebarSlice';
import expandNodeReducer from './reducer/expandNodeSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        expandNode: expandNodeReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch