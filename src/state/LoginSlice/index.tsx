import { Payload } from "@prisma/client/runtime/library";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import Cookies from "js-cookie";
import Cookies from "js-cookie"

interface payload{
    loginDetails:{
    email:string,
    password:any
    }
}

export const LoginUser = createAsyncThunk<string, payload>('LoginSlice',async(payload , thunkApi)=>{
    const {email , password} = payload.loginDetails
    
    
    const url = 'http://localhost:3000/login'
    const options = {
        method:'POST',
        headers:{
            'Content-Type':'Application/json',
            'Accept':'Application/json',
            'Authorization':''
        },
        body:JSON.stringify({email, password})

    }
    try{
    const result  = await fetch(url , options)
    console.log(result.status)
    const result_text = await result.text()
    if(result.status === 200){
        
    return result_text
    }
    else if(result.status == 404 ){
        return thunkApi.rejectWithValue(result_text)
    }
    else{
        return thunkApi.rejectWithValue(result_text)
    }
}
catch(e){
    return thunkApi.rejectWithValue('Server Error')
}
    
    
})
interface initialState{
    loading:boolean,
    jwt_token:string | null,
    error_msg:string
}

const initialState:initialState = {
    
        loading:false,
        jwt_token:null,
        error_msg:''
    
}

const LoginSlice = createSlice({
    name:'LoginSlice', 
    initialState,
    reducers:{
        add_jwt_token:(state, action)=>{
            state.jwt_token = action.payload
        },
        remove_jwt_token:(state)=>{
            Cookies.remove('authToken')
            state.jwt_token = ''
        }
        

    },
    extraReducers:(builder)=>{
        builder.addCase(LoginUser.pending , (state)=>{
            state.loading= true
        })
        .addCase(LoginUser.fulfilled, (state, action)=>{
            
            state.loading =  false
            state.error_msg = ''
            state.jwt_token = action.payload
            Cookies.set('authToken', action.payload, {expires:1})
        })
        .addCase(LoginUser.rejected, (state, action:Payload<string>)=>{
            state.loading= false
            state.error_msg = action.payload
        })
    }
})

export default LoginSlice.reducer

export const  {add_jwt_token , remove_jwt_token} = LoginSlice.actions
