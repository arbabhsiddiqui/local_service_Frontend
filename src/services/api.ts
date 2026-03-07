
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth"
import { TAGS } from "@/types/apiTags"

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes:[TAGS.USER],
  endpoints: () => ({})
})