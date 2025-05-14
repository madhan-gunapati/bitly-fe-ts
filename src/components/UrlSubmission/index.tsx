import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getShortUrl } from "../../state/MiniurlSlice"

import { clearShortUrl } from "../../state/MiniurlSlice"
import { remove_jwt_token } from "../../state/LoginSlice"
import { AppDispatch, RootState } from "../../state/store"

const UrlSubmission = () => {
  const [input_url, changeUrlState] = useState('')
  const { short_url, error_msg, loading } = useSelector((state: RootState) => state.MiniurlSlice)
  const dispatch = useDispatch<AppDispatch>()

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearShortUrl())
    changeUrlState(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col space-y-6 items-center">
        <h2 className="text-2xl font-semibold text-indigo-600 text-center">Shorten Your Link</h2>
        <p className="text-sm text-gray-600 text-center">Paste your long URL below and get a shortened one instantly.</p>
        
        <input
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          type="text"
          value={input_url}
          placeholder="start with www"
          onChange={changeUrl}
        />

        <button
          type="button"
          onClick={() => dispatch(getShortUrl({ input_url }))}
          className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
        >
          {loading ? 'Processing...' : 'Generate Short URL'}
        </button>

        {short_url && (
          <div className="w-full text-center">
            <p className="text-gray-700 font-medium">Your Tiny URL: <span className="text-indigo-600 font-bold break-all">{short_url}</span></p>
            {/* <p className="text-indigo-600 font-bold break-all">{short_url}</p> */}
            <p className="text-xs text-gray-500">(will replace emejy.live with domain like bit.ly)</p>
          </div>
        )}

        {error_msg && <p className="text-red-500 text-sm">{error_msg}</p>}

        <button
          type="button"
          onClick={() => dispatch(remove_jwt_token())}
          className="w-full bg-red-400 text-white py-2 rounded-lg hover:bg-red-500 transition"
        >
          Logout
        </button>

        {/* <Link to="/">
          <p className="text-sm text-blue-500 hover:underline mt-2">Back to Home</p>
        </Link> */}
      </div>
    </div>
  )
}

export default UrlSubmission
