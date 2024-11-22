import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: React.ReactElement
  isAuth: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  isAuth,
  ...rest
}) => {
  return isAuth ? element : <Navigate to="/login" />
}

export default ProtectedRoute
