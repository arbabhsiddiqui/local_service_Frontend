// components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../app/store"

interface Props {
  children: JSX.Element
  role?: string
}

const ProtectedRoute = ({ children, role }: Props) => {

  const { user } = useSelector((state: RootState) => state.auth)

  if (!user) return <Navigate to="/login" />

  if (role && user.role !== role)
    return <Navigate to="/unauthorized" />

  return children
}

export default ProtectedRoute