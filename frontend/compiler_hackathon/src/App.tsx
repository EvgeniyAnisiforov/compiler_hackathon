import "./App.css"
import {Route, Routes } from "react-router-dom"

import { LoginPage } from "./pages/Login/LoginPage"
import { RegistrationPage } from "./pages/Registration/RegistrationPage"
import { HomePage } from "./pages/Home/HomePage"
import { NotFoundPage } from "./pages/NotFound/NotFoundPage"

function App() {

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
