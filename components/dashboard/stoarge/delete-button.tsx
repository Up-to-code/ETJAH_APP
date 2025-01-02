'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteButtonProps {
  onDelete: (id: string) => Promise<void> // Ensure onDelete is async
  fileId: string
  fileKey: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, fileId, fileKey }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await onDelete(fileKey) // Call the onDelete function
      setIsDialogOpen(false) // Close the dialog after successful deletion
    } catch (err) {
      setError('Failed to delete the file. Please try again.') // Handle errors
    } finally {
      setIsDeleting(false) // Reset the loading state
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
          aria-label="Delete file"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the file.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            aria-disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton