"use server";

import { prisma } from "@/lib/db";

interface CreateFileParams {
  name: string;
  key: string;
  url: string;
  size: number;
  type: string;
}

const create_file = async (folderId: string, params: CreateFileParams) => {
  try {
    // First, get the folder to ensure it exists
    const folder = await prisma.folder.findUnique({
      where: { id: folderId }
    });

    if (!folder) {
      return {
        success: false,
        error: "Folder not found"
      };
    }

    // Create the file
    const file = await prisma.file.create({
      data: {
        name: params.name,
        key: params.key,
        url: params.url,
        size: params.size,
        type: params.type,
        folderId: folderId,
      },
    });

    // Update the folder's itemCount
    await prisma.folder.update({
      where: { id: folderId },
      data: {
        itemCount: { increment: 1 }
      }
    });

    return {
      success: true,
      file,
    };
  } catch (error) {
    console.error("Error creating file:", error);
    return {
      success: false,
      error: "Failed to create file"
    };
  }
};

export default create_file;