import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../pages/guest/Login'
import Customers from '../pages/private/customers'
import BaseLayout from '../components/layouts/BaseLayout'
import PrivateRoute from '../middleware/PrivateRoute'

const routes = [
    {path: "/", element: <Navigate to="login" />},
    {path: "/login", element: <Login />},
    {path: "/dashboard", element: <PrivateRoute element={<BaseLayout />} />, children: [
        {path: "", element: <Navigate to="customers" />},
        {path: "customers", element: <PrivateRoute element={<Customers />} />}
    ]},
    { path: '*', element: <Navigate to="/" /> },
]
const AppRoutes = () => {
    const route = useRoutes(routes)
    return route
}

export default AppRoutes
