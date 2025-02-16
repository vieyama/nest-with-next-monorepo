import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        expanded: true,
    },
    reducers: {
        expand: (state) => {
            state.expanded = true
        },
        collapse: (state) => {
            state.expanded = false
        },
    },
})

export const sidebarExpanded = (state: { sidebar: { expanded: boolean } }) => state.sidebar.expanded

export const { expand, collapse } = sidebarSlice.actions
export default sidebarSlice.reducer
