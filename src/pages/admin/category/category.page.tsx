import { useState } from "react"

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

type Category = {
  id: number
  name: string
}

export default function CategoryPage() {

  const { data: categories = [], isLoading } = useGetAllCategoryQuery()

  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const [name, setName] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      if (editingId) {

        await updateCategory({
          id: editingId,
          name,
        }).unwrap()

        setEditingId(null)

      } else {

        await addCategory({
          name,
        }).unwrap()

      }

      setName("")

    } catch (error) {
      console.error("Category mutation failed", error)
    }
  }

  const handleEdit = (category: Category) => {
    setName(category.name)
    setEditingId(category.id)
  }

  const handleDelete = async (id: number) => {
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

      {/* TABLE */}
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

            {categories.map((category: Category) => (
              <TableRow key={category.id}>

                <TableCell>{category.id}</TableCell>

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
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </div>

      {/* FORM */}
      <div className="bg-card border rounded-lg p-6">

        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-2">
            <Label>Category Name</Label>

            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          <Button className="w-full">

            {editingId
              ? "Update Category"
              : "Create Category"}

          </Button>

        </form>

      </div>

    </div>
  )
}