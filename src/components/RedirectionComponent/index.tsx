import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"

const RedirectionComponent = ()=>{
    const [err , setErr] = useState('')
    const {id} = useParams()
    
    

    useEffect( ()=>{
        const fetchData = async()=>{
            const url = 'http://ec2-16-171-193-231.eu-north-1.compute.amazonaws.com/redirection-url'
            const options = {
                method:'PUT',
                headers:{
                    'Content-Type':'Application/json',
                    'Accept':'Application/json',
                    'Authorization':''
                },
                body:JSON.stringify({
                    short_url: '13.48.194.218/'+id
                })
            }
            try{
            const response = await fetch(url,options)
            
            const redirec_url = await response.text()
           const final_url =  redirec_url.startsWith('https://')? redirec_url : 'https://'+redirec_url
            console.log(final_url)
             window.open(final_url)
           // window.open('www.youtube.com')
          // window.location.href = 'www.google.com' ;
            }
            catch(e){
                setErr('Error , Try Again .....')
            }
        }
        fetchData();
       
    },[])

    return <div>
        <h1>This is Redirection Component</h1>
        {err!=='' ? <p>Error Try Again</p> : ''}
    </div>
}

export default RedirectionComponent