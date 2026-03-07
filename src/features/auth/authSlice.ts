// features/authSlice.ts

import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { AuthState, User } from "@/types/auth"


const initialState: AuthState = {
  accessToken: null,
  user: null,
  isBootstrapping: true
}

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },

    setUser: (state, action: PayloadAction<User| null>) => {
      state.user = action.payload
    },

    finishBootstrap: (state) => {
      state.isBootstrapping = false
    },

    logout: (state) => {
      state.accessToken = null
      state.user = null
      state.isBootstrapping = false
    }

  }
})

export const {
  setAccessToken,
  setUser,
  finishBootstrap,
  logout
} = authSlice.actions

export default authSlice.reducer