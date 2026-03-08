import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/useRedux"

interface ProtectedRouteProps {
  allowedRoles: string[]
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!allowedRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}