
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../../state/store"

const ProtectedRoute = ()=>{
    const {jwt_token} = useSelector((state:RootState)=>state.LoginSlice)
    
    
    
    return ( (jwt_token!== null && jwt_token.length>0) ? <Outlet />:<Navigate to='/login' />)
}
export default ProtectedRoute