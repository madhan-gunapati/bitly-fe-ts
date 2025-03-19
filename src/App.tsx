import { useState } from "react"

import UrlSubmission from "./components/UrlSubmission";
import {  Route, Routes } from "react-router-dom";
import RedirectionComponent from "./components/RedirectionComponent";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import UserRegistration from "./components/UserRegistration";

const App = ()=>{
  
 
  return <div>
     <h1>Bitly URL Shortner</h1>
     <Routes>
      <Route  Component={ProtectedRoute} >
        <Route path='/' Component={UrlSubmission} />
      </Route>
      <Route path="/login" Component={Login} />
    <Route path="/register" Component={UserRegistration  } />
    
    <Route path="/:id" Component={RedirectionComponent} />
    </Routes>
   
    
  </div>
}

export default App