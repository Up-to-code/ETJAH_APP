import { CreateFolderButton } from "@/components/dashboard/stoarge/CreateFolderButton"
import { FolderItem } from "@/components/dashboard/stoarge/folder"

 
// Mock data for folders
const folders = [
  { id: '1', name: 'Documents', itemCount: 15 },
  { id: '2', name: 'Images', itemCount: 32 },
  { id: '3', name: 'Projects', itemCount: 8 },
  { id: '4', name: 'Downloads', itemCount: 24 },
]

export default function StoragePage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Folders</h1>
          <CreateFolderButton />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              id={folder.id}
              name={folder.name}
              itemCount={folder.itemCount}
            />
          ))}
        </div>
      </div>
    )
  }
