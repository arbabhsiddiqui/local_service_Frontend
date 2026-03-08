import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "@/features/admin/category/categoryApi"



/* ---------------- VALIDATION ---------------- */

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .regex(
      /^[A-Za-z][A-Za-z\s]*$/,
      "Category must start with a letter and contain only letters"
    ),
})

type FormValues = z.infer<typeof categorySchema>

type Category = {
  _id: string
  name: string
}



/* ---------------- COMPONENT ---------------- */

export default function CategoryPage() {

  const { data: categories = { data: [] }, isLoading } =
    useGetAllCategoryQuery(undefined)

  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const [editingId, setEditingId] = useState<string | null>(null)



  /* ---------------- REACT HOOK FORM ---------------- */

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
  })



  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: FormValues) => {
    try {

      if (editingId) {

        await updateCategory({
          id: editingId,
          name: data.name,
        }).unwrap()

        setEditingId(null)

      } else {

        await addCategory({
          name: data.name,
        }).unwrap()

      }

      reset()

    } catch (error) {
      console.error("Category mutation failed", error)
    }
  }



  /* ---------------- EDIT ---------------- */

  const handleEdit = (category: Category) => {
    setEditingId(category._id)
    setValue("name", category.name)
  }



  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap()
    } catch (error) {
      console.error("Delete failed", error)
    }
  }



  if (isLoading) {
    return <p>Loading categories...</p>
  }



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ---------------- TABLE ---------------- */}

      <div className="lg:col-span-2 bg-card border rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">
          Categories
        </h2>

        <Table>

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {categories.data.map((category: Category) => (
              <TableRow key={category._id}>

                <TableCell>{category._id}</TableCell>

                <TableCell>{category.name}</TableCell>

                <TableCell className="text-right space-x-2">

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>



      {/* ---------------- FORM ---------------- */}

      <div className="bg-card border rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <div className="space-y-2">

            <Label>Category Name</Label>

            <Input
              placeholder="Enter category name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

          </div>



          <Button className="w-full">
            {editingId
              ? "Update Category"
              : "Create Category"}
          </Button>



          {editingId && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                setEditingId(null)
                reset()
              }}
            >
              Cancel Edit
            </Button>
          )}

        </form>

      </div>

    </div>
  )
}