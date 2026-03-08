import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/useRedux"

/**
 * Prevents unauthenticated users from reaching any routes nested inside.
 * If there's no user in state, they'll be sent back to the root login page.
 */
export default function RequireAuth() {
    const { user } = useAppSelector((state) => state.auth)

    if (!user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
