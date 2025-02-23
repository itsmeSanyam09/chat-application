import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes,Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react';
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'



const App = () => {
  const {authUser, checkAuth,isCheckingAuth,onlineUsers}= useAuthStore();
  const {theme} =  useThemeStore();
  console.log({onlineUsers});
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser});
  if(isCheckingAuth && !authUser){
    return(
    <div className="flex items-center justify-center h-screen">
      <Loader className='size-[70px] animate-spin' ></Loader>
      
    </div>

  )}
  
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/signup"/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={!authUser?<LoginPage />:<Navigate to="/"/>} ></Route>
        <Route path="/settings" element={<SettingsPage />} ></Route>
        <Route path="/profile" element={authUser?<ProfilePage />:<Navigate to="/login" />} />
      </Routes>

      <Toaster className='top-center' reverseOrder={false}/>




    </div>
  )
}

export default App


