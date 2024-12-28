import { Folder } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

interface FolderItemProps {
  id: string
  name: string
  itemCount: number
}

export function FolderItem({ id, name, itemCount }: FolderItemProps) {
  return (
    <Link href={`/folders/${id}`} className="block transition-transform hover:scale-105">
      <Card>
        <CardContent className="flex items-center space-x-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <Folder className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{itemCount} items</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

