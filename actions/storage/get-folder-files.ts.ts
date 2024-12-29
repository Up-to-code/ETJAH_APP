"use server";

import { prisma } from "@/lib/db";

export const getFolderFiles = async (folderId: string) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        folderId: folderId,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      files
    };
  } catch (error) {
    console.error("Error fetching folder files:", error);
    return {
      success: false,
      error: "Failed to fetch files"
    };
  }
};
