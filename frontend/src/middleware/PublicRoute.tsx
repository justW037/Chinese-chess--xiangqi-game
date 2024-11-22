import React from 'react'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  element: React.ElementType
  isAuth: boolean
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  element: Component,
  isAuth,
  ...rest
}) => {
  return isAuth ? <Navigate to="/" /> : <Component {...rest} />
}

export default PublicRoute
