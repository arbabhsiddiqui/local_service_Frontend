import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    user: {
      id?: string
      email: string
      fullName: string
      roleName: "admin" | "service_user" | "client_user"
    }
  }
  message: string
  success: boolean
}

export interface SignupRequest {
  email: string
  password: string
  name: string
}

export interface RefreshTokenResponse {
  data: {
    user: {
      id?: string
      email: string
      fullName: string
      roleName: "admin" | "service_user" | "client_user"
    }
  }
  message: string
  success: boolean
}

export interface LogoutResponse {
  success: boolean
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    // Important: Include credentials to send and receive HTTP-only cookies
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<LoginResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/user/refresh-token",
        method: "POST",
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<LoginResponse["data"]["user"], void>({
      query: () => "/user/me",
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi
