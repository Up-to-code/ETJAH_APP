import AlreadyUploaded from "@/components/dashboard/stoarge/AlreadyUploaded";
import VideoUploader from "@/components/dashboard/stoarge/uploading";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <VideoUploader id={id} />
      <AlreadyUploaded
        folderId={id}
        
       />
    </div>
  );
}

export default page;
