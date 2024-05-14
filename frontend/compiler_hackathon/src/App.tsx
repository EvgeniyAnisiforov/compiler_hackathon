import "./App.css"
import {Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { LoginPage } from "./pages/Login/LoginPage"
import { RegistrationPage } from "./pages/Registration/RegistrationPage"
import { HomePage } from "./pages/Home/HomePage"
import { NotFoundPage } from "./pages/NotFound/NotFoundPage"

function App() {

  const navigate = useNavigate();

     useEffect(() => {
       navigate('/'); 
     }, []); 
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
