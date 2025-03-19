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


  

  

    return <div>
              <h4>Enter the Long link below and wait for the short url</h4>
              <div id='url-input'>
                    <input type="text" value={input_url} placeholder="link" onChange={changeUrl} /> <br />
                  
                    <button type="button" onClick={()=>{dispatch(getShortUrl({input_url}))}}>Submit URL</button>
                  
              </div>
              <h3>Your Tiny Url : {short_url}</h3>

              <p>{error_msg}</p>
              
              <button type="button" onClick={()=>{dispatch(remove_jwt_token())}}>LOGOUT USER</button>
              </div>
            
}

export default UrlSubmission