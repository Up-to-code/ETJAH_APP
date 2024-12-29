"use client";
import create_file from "@/actions/storage/CreateFile";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

export default function VideoUploader({ id }: { id: string }) {
  return (
    <main className=" py-4">
      <UploadDropzone
        endpoint="mediaUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          res.map(async(file) => {
            await create_file(id, file);
          });
          toast.success("uploaded successfully 🎉🎉🎉");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error(error.message);
        }}
      />
    </main>
  );
}
