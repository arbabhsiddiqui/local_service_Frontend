import { api } from "@/services/api"
import { setAccessToken, setUser, logout } from "@/features/auth/authSlice"
import type { User } from "@/types/auth"
import { TAGS } from "@/types/apiTags";

export const authApi = api.injectEndpoints({

  endpoints: (builder) => ({

    login: builder.mutation<
     { data: { accessToken: string } },
      { email: string; password: string }
    >({

      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {

        try {

          const { data } = await queryFulfilled

          dispatch(setAccessToken(data.data.accessToken))

        await dispatch(
          // forceRefetch to ensure we fetch user even if cached
          authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
        ).unwrap()

        } catch {}
      }
    }),

    getMe: builder.query<{ data: User }, void>({
      query: () => "/user/me",
      providesTags: [TAGS.USER],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {

        try {

          const { data } = await queryFulfilled

          dispatch(setUser(data.data))

        } catch {}
      }
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST"
      }),

      async onQueryStarted(arg, { dispatch }) {
        dispatch(logout())
      }
    }),

    refresh: builder.mutation<{ accessToken: string }, void>({
  query: () => ({
    url: "/user/refresh-token",
    method: "POST"
  })
}),

  })
})

export const {
  useRefreshMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation
} = authApi