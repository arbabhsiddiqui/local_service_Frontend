import { api } from "@/services/api";
import { TAGS } from "@/types/apiTags";

export const userTypeApi = api.injectEndpoints({
    endpoints: (builder) => ({

        addUserType: builder.mutation<any, any>({
            query: (data) => ({
                url: "/user-type",
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.USERTYPE]
        }),
        getAllUserType: builder.query<any, any>({
            query: () => "/user-type",
            providesTags: [TAGS.USERTYPE],
        }),
        getUserTypeById: builder.query<any, any>({
            query: (id) => ({
                url: `/user-type/${id}`,
            }),
            providesTags: [TAGS.USERTYPE],
        }),
        updateUserType: builder.mutation<any, any>({
            query: ({ id, ...rest }) => ({
                url: `/user-type/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: [TAGS.USERTYPE]
        }),
        deleteUserType: builder.mutation<any, any>({
            query: (id) => ({
                url: `/user-type/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TAGS.USERTYPE]
        })


    })


})


export const { useAddUserTypeMutation, useDeleteUserTypeMutation, useGetAllUserTypeQuery, useGetUserTypeByIdQuery } = userTypeApi