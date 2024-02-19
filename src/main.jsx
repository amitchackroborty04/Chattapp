import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import firebaseConfig from './fairbase.conflig.js'
import './index.css'
import Signup from './pages/signup.jsx'
import { store } from './store'
import { Provider } from 'react-redux'

import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Loging from './pages/Loging.jsx'
import Home from './pages/Home.jsx'
import Message from './pages/Message.jsx'
const router = createBrowserRouter([

  {
    path: "/Signup",
    element: <Signup />,

  },
  {
    path: "/",
    element: <Loging />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/message",
    element: <Message />,
  },



]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,




)
