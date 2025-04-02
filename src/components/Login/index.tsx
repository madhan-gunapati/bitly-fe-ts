import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { add_jwt_token , LoginUser } from "../../state/LoginSlice"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../state/store"

const Login = ()=>{
    const {loading, error_msg, jwt_token} = useSelector((state:RootState)=>state.LoginSlice)
    const naviagte = useNavigate()
    const [loginDetails , changeDetails] = useState({email:'' , password:''})
    const dispatch = useDispatch<AppDispatch>()
    const changeEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        changeDetails((p)=>({...p , email:e.target.value}))
    }

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>)=>{
            changeDetails((p)=>({...p, password:e.target.value}))
    }

    useEffect(()=>{
        const stored_cookie = Cookies.get('authToken')
        
        if(stored_cookie){
           
            
            dispatch(add_jwt_token(stored_cookie))
            naviagte('/')
        }

       

    },[jwt_token])

        
    return <div className="w-screen flex flex-row justify-center ">
        <div className=" flex flex-col align-middle">
        <h2 className="text-xl text-center">Login Form</h2> 
        <form className="flex flex-col justify-center" onSubmit={(e)=>{
            e.preventDefault()
        }}>

        <input className="h-6 border-2 p-3 m-1.5 " type="text" value={loginDetails.email} placeholder="email" onChange={changeEmail} /> <br />
        <input className="h-6 border-2 p-3 m-1.5 " type="password" value={loginDetails.password} placeholder="password" onChange={changePassword}/> <br />
        <button className="bg-blue-300 p-1.5 rounded-md  " type="button" onClick={()=>{dispatch(LoginUser({loginDetails}))}}>Login</button> <br />
       <Link to='/register'> <button className="bg-blue-300 p-1.5 rounded-md m-1.5 w-full" type="button">New User</button></Link>
        </form>
        <p>{error_msg}</p>
        </div>
    </div>
}

export default Login