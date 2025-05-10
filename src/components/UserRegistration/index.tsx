import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { change_result, sendUsertoDB } from "../../state/userSlice"
import { AppDispatch, RootState } from "../../state/store"

const UserRegistration = () => {
    const [userDetails, changeUserDetails] = useState({ name: '', email: '', password: '' })
    const { loading, result } = useSelector((state: RootState) => state.HomeSlice)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeUserDetails(p => ({ ...p, name: e.target.value }))
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeUserDetails(p => ({ ...p, email: e.target.value }))
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeUserDetails(p => ({ ...p, password: e.target.value }))
    }

    const submitDetails = async () => {
        dispatch(sendUsertoDB(userDetails))
    }

    useEffect(() => {
        if (result === 'success') {
            navigate('/login')
            dispatch(change_result())
        }
    }, [result])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600">Create Account</h1>
                {loading ? (
                    <p className="text-center text-gray-500">Registering user...</p>
                ) : (
                    <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={userDetails.name}
                                onChange={changeUsername}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="text"
                                value={userDetails.email}
                                onChange={changeEmail}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={userDetails.password}
                                onChange={changePassword}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={submitDetails}
                            className="bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition"
                        >
                            Register
                        </button>
                        <Link to='/login'>
                            <button
                                type="button"
                                className="w-full text-indigo-500 border border-indigo-500 py-3 rounded-lg hover:bg-indigo-50 transition"
                            >
                                Already have an account? Login
                            </button>
                        </Link>
                        {result && <p className="text-center text-sm text-green-600">{result}</p>}
                    </form>
                )}
            </div>
        </div>
    )
}

export default UserRegistration
