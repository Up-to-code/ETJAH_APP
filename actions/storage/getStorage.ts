"use server";
import { prisma } from "@/lib/db"

const getStorage = async () => {
    const response = await prisma.folder.findMany()
    return response
}

export default getStorage