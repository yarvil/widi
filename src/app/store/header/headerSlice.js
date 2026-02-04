import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isShow: false,
};

const headerSlice = createSlice({
    name:'header',
    initialState,
    reducers:{
        actionMenu:(state)=>{
            state.isShow = !state.isShow
        }

    }
})


export const { actionMenu } = headerSlice.actions;


export default headerSlice.reducer;
