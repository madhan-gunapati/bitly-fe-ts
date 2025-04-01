import { Payload } from "@prisma/client/runtime/library";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
interface payload{
    name:string, 
    email:string, 
    password:any
}
export const sendUsertoDB = createAsyncThunk<string, payload>("data/fetch", async(payload, thunkApi)=>{
    
    const {name, email, password } = payload 
    const url = 'http://ec2-16-171-193-231.eu-north-1.compute.amazonaws.com/user-registration'
    const options = {
        method:'PUT', 
        headers:{
            'Content-Type':'Application/json',
            'Accept':'Application/json',
            'Authorization':''
        },
        body:JSON.stringify({name, email, password})

    }

        const response = await fetch(url, options)
        
        if(response.status === 400){
            
            const msg = await response.text()
            
            return thunkApi.rejectWithValue({ message: msg, code: 'P2025' });
        }
        const text = await response.json()
        
        return text.id
        
    }
)

const userSlice = createSlice({
    name:'userSlice',
    initialState:{
        user_id:'',
        loading:false, 
        result:''
    },
    reducers:{
        changeUser_id:(state, action)=>{
            state.user_id = action.payload
           
        },
        change_result:(state)=>{
            state.result = ''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(sendUsertoDB.pending,(state)=>{
            state.loading = true
        })
        .addCase(sendUsertoDB.fulfilled,(state, action)=>{  
            
            state.loading = false
            state.user_id = action.payload
            state.result='success'

        }).addCase(sendUsertoDB.rejected , (state, action:Payload<string>)=>{
            if(isRejectedWithValue(action)){
                 state.loading = false, 
            state.result = action.payload.message

            }
            
            state.loading = false, 
            state.result = 'Internal Server Error'
            
            

        })
    }
})


export const {change_result}  = userSlice.actions;

// export default userSlice.reducer;
export default userSlice.reducer;