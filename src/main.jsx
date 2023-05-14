import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Login from './Login'
import Logout from './Logout'
import Dashboard from './Dashboard'
import Report from './Report'
import Products from './Products'
import Testing from './Testing'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/:pathMatch(.*)*",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/products",
    element: <Products />,
    errorElement: <ErrorPage />
  },
  {
    path: "/report",
    element: <Report />,
    errorElement: <ErrorPage />
  },
  {
    path: "/testing",
    element: <Testing />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
