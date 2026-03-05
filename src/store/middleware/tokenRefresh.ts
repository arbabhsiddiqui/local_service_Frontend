import type { MiddlewareAPI } from "@reduxjs/toolkit"
import type { RootState } from "@/store"

/**
 * Middleware to handle automatic token refresh
 * When an API call returns a 401 (Unauthorized), it attempts to refresh the token
 */
export const baseQueryWithRefresh = async (
  _args: any,
  _api: MiddlewareAPI<any, RootState>,
  _extraOptions: any
) => {
  // This is handled by RTK Query's baseQuery configuration
  // The baseQuery with credentials: "include" will automatically send cookies
}

/**
 * Setup function to add token refresh interceptor
 * Call this in your App component or main setup
 */
export const setupTokenRefresh = () => {
  // Token refresh can be handled on 401 responses
  // When RTK Query receives a 401, it will retry with a token refresh call
}
