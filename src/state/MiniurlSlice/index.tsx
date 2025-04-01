import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Payload } from "@prisma/client/runtime/library";
interface payload{
    input_url : string
}
export const getShortUrl = createAsyncThunk<string, payload>('MiniurlSlice', async(payload, thunkApi)=>{
    const {input_url} = payload
    const state = thunkApi.getState() as RootState
    
    
    const jwt_token = state.LoginSlice.jwt_token
    
    const url = 'http://localhost:3000/short-url'
    const options = {
      method:'PUT',
      headers:{
        'Content-Type':'Application/json',
        'Accept':'Application/json',
        Authorization:`Bearer ${jwt_token}`
      },
      body:JSON.stringify({input_url})
    }
    try{
    const response = await fetch(url, options)
    const result_text = await response.json()
    
    if(response.status === 200){
        
        return result_text.short_url
        }
        else{

            return thunkApi.rejectWithValue(result_text)
        }
    }
    catch(e){
        return thunkApi.rejectWithValue('error')
    }
        
    }
)
interface initialState{
    loading:boolean,
    short_url:string | null, 
    error_msg:string
}

const initialState:initialState = {
    loading:false,
    short_url:null,
    error_msg:''
}

const MiniurlSlice = createSlice({
    name:'MiniurlSlice', 
    initialState, 
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getShortUrl.pending, (state)=>{
            state.loading = true
        })
        .addCase(getShortUrl.fulfilled, (state, action)=>{
            state.loading = false
                
            state.short_url = action.payload
            
        })
        .addCase(getShortUrl.rejected , (state, action:Payload<string>)=>{
            
            state.loading = false
            state.error_msg = action.payload
        })
    }
    
})

export default MiniurlSlice.reducer