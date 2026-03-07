
import {fetchBaseQuery} from "@reduxjs/toolkit/query"
import type {FetchArgs,FetchBaseQueryError} from '@reduxjs/toolkit/query'

import { Mutex } from "async-mutex"
import type { RootState } from "../app/store"
import { setAccessToken, logout } from "../features/auth/authSlice"

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {

    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }

    return headers
  }
})

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any
) => {

  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {

    if (!mutex.isLocked()) {

      const release = await mutex.acquire()

      try {

        const refreshResult = await baseQuery(
          { url: "/user/refresh-token", method: "POST" },
          api,
          extraOptions
        )

        if (refreshResult.data) {

          const accessToken = (refreshResult.data as any).accessToken

          api.dispatch(setAccessToken(accessToken))

          result = await baseQuery(args, api, extraOptions)

        } else {

          api.dispatch(logout())
        }

      } finally {
        release()
      }

    } else {

      await mutex.waitForUnlock()

      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}