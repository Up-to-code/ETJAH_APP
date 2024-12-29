import getStorage from "@/actions/storage/getStorage";
import { CreateFolderButton } from "@/components/dashboard/stoarge/CreateFolderButton";
import { FolderItem } from "@/components/dashboard/stoarge/folder";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

 
export default async function StoragePage() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");
   const Folders = await getStorage()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Folders</h1>
        <CreateFolderButton />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Folders.map((folder) => (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            itemCount={folder.itemCount}
          />
        ))}
      </div>
    </div>
  );
}
