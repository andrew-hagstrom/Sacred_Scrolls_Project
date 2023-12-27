import React from 'react'
import {RouterProvider} from "react-router-dom"
import router from "./router"
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)