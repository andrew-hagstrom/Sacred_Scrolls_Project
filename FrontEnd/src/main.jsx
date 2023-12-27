import React from 'react'
import {RouterProvider} from "react-router-dom"
import router from "./router"
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)