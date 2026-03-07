// hooks/useAuthBootstrap.ts

import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { setAccessToken, finishBootstrap } from "@/features/auth/authSlice"
import { useRefreshMutation,authApi } from "@/features/auth/authApi"

export const useAuthBootstrap = () => {

  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()

  useEffect(() => {

    // If another mount already started bootstrap, skip starting again
    if ((globalThis as any).__AUTH_BOOTSTRAP_STARTED) return

    ;(globalThis as any).__AUTH_BOOTSTRAP_STARTED = true

    if ((globalThis as any).__AUTH_BOOTSTRAP_DONE) return

    const initAuth = async () => {

      try {

        const res = await refresh().unwrap()

        dispatch(setAccessToken(res.accessToken))

        // fetch user after refresh (force refetch to ensure request runs)
        dispatch(
          authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
        )

      } catch (err) {

        // no session
      } finally {

        dispatch(finishBootstrap())
        ;(globalThis as any).__AUTH_BOOTSTRAP_DONE = true
        ;(globalThis as any).__AUTH_BOOTSTRAP_STARTED = false
      }
    }

    initAuth()

  }, [])
}