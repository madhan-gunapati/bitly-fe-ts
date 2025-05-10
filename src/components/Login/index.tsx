import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add_jwt_token, LoginUser } from "../../state/LoginSlice"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../../state/store"

const Login = () => {
    const { loading, error_msg, jwt_token } = useSelector((state: RootState) => state.LoginSlice)
    const navigate = useNavigate()
    const [loginDetails, changeDetails] = useState({ email: '', password: '' })
    const dispatch = useDispatch<AppDispatch>()

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeDetails(p => ({ ...p, email: e.target.value }))
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeDetails(p => ({ ...p, password: e.target.value }))
    }

    useEffect(() => {
        const stored_cookie = Cookies.get('authToken')
        if (stored_cookie) {
            dispatch(add_jwt_token(stored_cookie))
            navigate('/')
        }
    }, [jwt_token])

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-600">Welcome Back!</h2>
                <form
                    className="flex flex-col space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        type="text"
                        placeholder="Email"
                        value={loginDetails.email}
                        onChange={changeEmail}
                    />
                    <input
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        type="password"
                        placeholder="Password"
                        value={loginDetails.password}
                        onChange={changePassword}
                    />
                    <button
                        type="button"
                        className="bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition"
                        onClick={() => dispatch(LoginUser({ loginDetails }))}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <Link to='/register'>
                        <button
                            type="button"
                            className="w-full text-indigo-500 border border-indigo-500 py-3 rounded-lg hover:bg-indigo-50 transition"
                        >
                            New User? Register
                        </button>
                    </Link>
                </form>
                {error_msg && <p className="text-center text-red-500 text-sm">{error_msg}</p>}
            </div>
        </div>
    )
}

export default Login
