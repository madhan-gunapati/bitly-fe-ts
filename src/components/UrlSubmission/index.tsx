import { useState } from "react";
import { Link } from "react-router-dom";

import { getShortUrl } from "../../state/MiniurlSlice";
import { useDispatch, useSelector } from "react-redux";

import { remove_jwt_token } from "../../state/LoginSlice";
import { AppDispatch, RootState } from "../../state/store";

const UrlSubmission = ()=>{
  
  
  const [input_url, changeUrlState] =useState('')
  
  const [response, changeResponse] = useState('...')
  const {short_url, error_msg , loading} = useSelector((state:RootState)=>state.MiniurlSlice)
  
  const dispatch = useDispatch<AppDispatch>()

  const changeUrl = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const new_url  = e.target.value;
    
    changeUrlState(new_url)
  }


  

  

    return <div className="flex flex-col align-middle ">
              <h4 className="text-center">Enter the Long link below and wait for the short url</h4>
             <div className="flex flex-col    items-center ">
              <div className="flex  flex-col  items-center justify-center" id='url-input'>
                    <input className="p-2 rounded-md bg-gray-400 w-56 m-1" type="text" value={input_url} placeholder="Enter link here ..." onChange={changeUrl} /> <br />
                  
                    <button className=" bg-blue-300 p-2 rounded-md" type="button" onClick={()=>{dispatch(getShortUrl({input_url}))}}>Submit URL</button>
                  
              </div>
              <h3 className="m-2 w-56 ">Your Tiny Url -: {short_url}</h3>
              <p className="text-center">(will update ip address with domain ,like bit.ly)</p>
              <p>{error_msg}</p>
              
              <button  className="w-fit bg-blue-300 p-2 rounded-md" type="button" onClick={()=>{dispatch(remove_jwt_token())}}>LOGOUT USER</button>
              </div>
              </div>
            
}

export default UrlSubmission