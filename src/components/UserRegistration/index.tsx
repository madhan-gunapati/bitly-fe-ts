import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"


import { change_result, sendUsertoDB } from "../../state/userSlice"
import { AppDispatch, RootState } from "../../state/store"

const UserRegistration = ()=>{

   
    const [userDetails, changeUserDetails] = useState({name:'', email:'', password:''})
    const {loading, result }= useSelector((state:RootState)=>state.HomeSlice)
    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
   const changeusername = (e:React.ChangeEvent<HTMLInputElement>)=>{
       changeUserDetails((p)=>({...p, name:e.target.value}))
   }
    
    const changeEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        changeUserDetails((p)=>({...p, email:e.target.value}))
    }

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
        changeUserDetails((p)=>({...p, password:e.target.value}))
    }

    const submitDetails = async ()=>{
        dispatch(sendUsertoDB(userDetails))
        
    } 
    useEffect(()=>{
        if(result === 'success'){
            navigate('/login')
            dispatch(change_result())
        }
    } , [result])

    

    return <div>
       
        <h1 className="text-2xl text-center text-blue-600">User Form</h1>
        {loading? <p>Loading.....</p>:
        <form className="flex flex-col items-center justify-start" onSubmit={(e)=>{e.preventDefault()}}>
            <div className="flex flex-col">
                <label htmlFor="name" className="text-start ">Name</label>
                <input className="bg-gray-300 rounded-md p-2 m-1" id='name' type="text" onChange={changeusername} value={userDetails.name}  /> <br />
            </div>
            <div className="flex flex-col">
            <label htmlFor="email" >Email</label>
            <input  className="bg-gray-300 rounded-md p-2 m-1" type="text" onChange={changeEmail} value={userDetails.email} /> <br />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input  className="bg-gray-300 rounded-md p-2 m-1" type="password" id='password' value={userDetails.password} onChange={changePassword} /> 
            
            </div>
            <button  className="bg-blue-300 p-2 rounded-md m-1"  type="button" onClick={submitDetails}>Register</button> <br />
            <Link to='/login'><button className="bg-blue-300 p-2 rounded-md m-1" type="button">Go to Login</button></Link>
            <p>{result}</p>
        </form>

       
}
    </div>
}

export default UserRegistration