import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/useRedux"
import type { UserRole } from "@/store/slices/authSlice"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: UserRole[]
}

export default function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isInitialLoad } = useAppSelector((state) => state.auth)

  if (isInitialLoad) {
    return <div>Loading...</div> // Or a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // use `roleName` field (consistent with User shape)
  if (requiredRoles && user && !requiredRoles.includes(user.roleName)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}
