import "./App.css"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { LoginPage } from "./pages/LoginPage"
import { RegistrationPage } from "./pages/RegistrationPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"

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
