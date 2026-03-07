import { api } from "@/services/api";
import { TAGS } from "@/types/apiTags";

export const categoryApi = api.injectEndpoints({
    endpoints: (builder) => ({

        addCategory:builder.mutation<any,any>({
            query:(data)=>({
                url:"/category",
                method:"POST",
                body:data
            }),
            invalidatesTags: [TAGS.CATEGORY]
        }),
        getAllCategory:builder.query<any,any>({
            query:()=>"/category",
            providesTags: [TAGS.CATEGORY],
        }),
        getCategoryById:builder.query<any,any>({
            query:(id)=>({
                url:`/category/${id}`,
            }),
             providesTags: [TAGS.CATEGORY],
        }),
        updateCategory:builder.mutation<any,any>({
            query:({id,...rest})=>({
                url:`/category/${id}`,
                method:"PUT",
                body:rest
            })
        }),
        deleteCategory:builder.mutation<any,any>({
            query:(id)=>({
                url:`/category/${id}`,
                method:"DELETE",
            })
        })


    })


})


export const { useAddCategoryMutation,useDeleteCategoryMutation,useGetAllCategoryQuery,useGetCategoryByIdQuery,useUpdateCategoryMutation} = categoryApi