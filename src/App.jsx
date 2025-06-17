import { useState } from 'react'
// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Pastes from './Components/Pastes'
import ViewPaste from './Components/ViewPaste'

function App() {
  let router =  createBrowserRouter(
    [
      {
        path:"/",
        element:
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path:'/pastes',
        element:<div><Navbar/><Pastes/></div> 
      },
      {
        path:'/pastes/:id',
        element:<div><ViewPaste/></div> 
      }
    ]
  )

  return (
    <div className='container'>
      <RouterProvider router={router}>

      </RouterProvider>

    </div>
  )
}

export default App
