import { createSlice } from '@reduxjs/toolkit'

export const expandNodeSlice = createSlice({
    name: 'expandNode',
    initialState: {
        isExpand: false,
    },
    reducers: {
        expand: (state) => {
            state.isExpand = true
        },
        collapse: (state) => {
            state.isExpand = false
        },
    },
})

export const isExpanded = (state: { expandNode: { isExpand: boolean } }) => state.expandNode.isExpand

export const { expand, collapse } = expandNodeSlice.actions
export default expandNodeSlice.reducer
