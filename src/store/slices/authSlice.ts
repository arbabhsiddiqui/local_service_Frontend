import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserRole = "admin" | "service_user" | "client_user"

export interface User {
  id?: string
  email: string
  fullName: string
  roleName: UserRole
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialLoad: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isInitialLoad: true,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setInitialLoad: (state, action: PayloadAction<boolean>) => {
      state.isInitialLoad = action.payload
    },
    checkAuth: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = action.payload
        state.isAuthenticated = true
      } else {
        state.user = null
        state.isAuthenticated = false
      }
    },
  },
})

export const { setLoading, setUser, setError, logout, clearError, setInitialLoad, checkAuth } =
  authSlice.actions
export default authSlice.reducer
