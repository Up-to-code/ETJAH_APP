"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileIcon,
  Loader2,
  GridIcon,
  ListIcon,
  ImageIcon,
  FileTextIcon,
  FileAudioIcon,
  FileVideoIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { File } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getFolderFiles } from "@/actions/storage/get-folder-files.ts";
import DeleteButton from "./delete-button";
import Link from "next/link";

interface GetFolderFilesResponse {
  success: boolean;
  files: File[];
  error?: string;
}

interface AlreadyUploadedProps {
  folderId: string;
}

const AlreadyUploaded = ({ folderId }: AlreadyUploadedProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const result = (await getFolderFiles(
          folderId
        )) as GetFolderFilesResponse;
        if (result.success && result.files) {
          setFiles(result.files);
        } else {
          setError(result.error || "Error loading files");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [folderId]);

  const handleDelete = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="size-5" />;
    if (fileType.startsWith("audio/"))
      return <FileAudioIcon className="size-5" />;
    if (fileType.startsWith("video/"))
      return <FileVideoIcon className="size-5" />;
    if (fileType.startsWith("text/"))
      return <FileTextIcon className="size-5" />;
    return <FileIcon className="size-5" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading files...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p className="text-lg font-semibold">Error loading files</p>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
        <FileIcon className="mb-4 size-12 text-muted-foreground/50" />
        <p className="text-lg font-semibold">No files uploaded yet</p>
        <p className="mt-2 text-sm">Upload your first file to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Uploaded Files</h2>
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "grid" | "list")}
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <GridIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <ListIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ScrollArea className="h-[400px] pr-4">
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 gap-4 md:grid-cols-3"
              : "space-y-4"
          }
        >
          {files.map((file) => (
            <Card key={file.id} className="transition-all hover:shadow-md">
              <CardContent
                className={`flex ${
                  viewMode === "grid" ? "flex-col" : "flex-row"
                } items-center justify-between p-4`}
              >
                <div
                  className={`flex ${
                    viewMode === "grid" ? "flex-col" : "flex-row"
                  } items-center gap-4`}
                >
                  <div className="rounded-lg bg-secondary p-2">
                    {getFileIcon(file.type)}
                  </div>
                  <div
                    className={viewMode === "grid" ? "mt-2 text-center" : ""}
                  >
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="rounded-sm">
                        {formatBytes(file.size)}
                      </Badge>
                      <span>•</span>
                      <span>
                        {formatDistanceToNow(new Date(file.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex ${
                    viewMode === "grid" ? "mt-4 justify-center" : ""
                  } gap-2`}
                >
                  {/* <DownloadButton
                    fileUrl={file.url}
                    fileName={file.name}
                    fileType={file.type}
                  /> */}
         <Link href={file.url as string} target="_blank" className="text-blue-500 hover:underline">
          Show
         </Link>
                  <DeleteButton fileId={file.id} onDelete={handleDelete} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlreadyUploaded;
