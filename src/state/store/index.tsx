import { configureStore } from "@reduxjs/toolkit";


import userSliceReducer from "../userSlice";
import LoginSliceReducer from "../LoginSlice";
import MiniurlSliceReducer from "../MiniurlSlice";

const store = configureStore({
    reducer:{
        HomeSlice:userSliceReducer, 
        LoginSlice:LoginSliceReducer,
        MiniurlSlice:MiniurlSliceReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;