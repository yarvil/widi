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
        },
        closeMenu:(state,{payload})=>{
            state.isShow = payload
        }

    }
})


export const { actionMenu,closeMenu } = headerSlice.actions;


export default headerSlice.reducer;
