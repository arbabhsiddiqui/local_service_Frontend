import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useRefreshTokenMutation } from "@/store/api/authApi"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setUser, logout, setInitialLoad } from "@/store/slices/authSlice"
import { store } from "@/store"

// Module-level guard to avoid duplicate restore attempts (React StrictMode mounts twice)
let restoreAttempted = false

/**
 * Hook to handle token refresh on app initialization and periodically
 * Automatically refreshes the access token using the refresh token stored in HTTP-only cookie
 */
export const useAuthRefresh = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [refreshToken] = useRefreshTokenMutation()
  const location = useLocation()

  // On initial mount, attempt to restore session. Guard against duplicate runs.
  useEffect(() => {
    // Don't attempt refresh if on login page
    if (location.pathname === "/login") {
      dispatch(setInitialLoad(false))
      return
    }

    // If we've already attempted restore in this page session, skip (prevents StrictMode double-run)
    if (restoreAttempted) {
      dispatch(setInitialLoad(false))
      return
    }

    // If already authenticated, nothing to do
    const currentAuth = store.getState().auth.isAuthenticated
    if (currentAuth) {
      restoreAttempted = true
      dispatch(setInitialLoad(false))
      return
    }

    restoreAttempted = true
    let mounted = true
    const tryRestore = async () => {
      dispatch(setInitialLoad(true))
      try {
        const refreshResult = await refreshToken().unwrap()
        // Check store state: if user logged out in the meantime, don't overwrite
        const nowAuth = store.getState().auth.isAuthenticated
        if (mounted && !nowAuth) {
          dispatch(setUser(refreshResult.data.user))
        }
      } catch (error) {
        if (mounted) {
          dispatch(logout())
        }
      } finally {
        if (mounted) {
          dispatch(setInitialLoad(false))
        }
      }
    }

    tryRestore()

    return () => {
      mounted = false
    }
    // run only on mount (and when refreshToken or location changes)
  }, [dispatch, refreshToken, location.pathname])

  // When authenticated, start periodic refresh interval.
  useEffect(() => {
    if (!isAuthenticated) return

    const refreshInterval = setInterval(() => {
      ;(async () => {
        try {
          const refreshResult = await refreshToken().unwrap()
          dispatch(setUser(refreshResult.data.user))
        } catch (error) {
          console.error("Periodic token refresh failed:", error)
          dispatch(logout())
        }
      })()
    }, 9 * 60 * 1000)

    return () => clearInterval(refreshInterval)
  }, [isAuthenticated, dispatch, refreshToken])
}
