import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Drawer from './Components/Drawer'
import Upload from './Upload'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import { Route, Routes } from "react-router-dom";
import { Box } from '@mui/material'

function App() {
  return (
    <Box sx={{
      display: "flex"
    }} className={"container"}>
      <Drawer />
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/upload" element={<Upload/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/signup" element={<Signup/>} exact />
        </Routes>
    </Box>
  );
}

export default App
