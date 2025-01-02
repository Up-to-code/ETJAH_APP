"use server";

import { prisma } from "@/lib/db";
import { utapi } from "@/lib/uploadthin/utsAPI";

interface DeleteFileParams {
  KAY: string;
  file_db_id: string;
}

export const deleteFile = async ({
  KAY,
  file_db_id,
}: DeleteFileParams): Promise<{ success: boolean; error?: string }> => {
  // Input validation
  if (!KAY || !file_db_id) {
    return {
      success: false,
      error: "Invalid input: KAY and file_db_id are required",
    };
  }

  try {
    // Check if the file exists in the database
    const fileExists = await prisma.file.findUnique({
      where: { id: file_db_id },
      include: { folder: true }, // Include the folder to access its itemCount
    });

    if (!fileExists) {
      return { success: false, error: "File not found in the database" };
    }

    // Delete file from UploadThing storage
    const deleteStorageResult = await utapi.deleteFiles([KAY]);

    if (!deleteStorageResult.success) {
      return { success: false, error: "Failed to delete file from storage" };
    }

    // Delete file from the database
    const deleteDbResult = await prisma.file.delete({
      where: { id: file_db_id },
    });

    // Update the folder's itemCount
    await prisma.folder.update({
      where: { id: fileExists.folderId },
      data: { itemCount: fileExists.folder.itemCount - 1 },
    });

    if (deleteDbResult.id) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to delete file from database" };
    }
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
};