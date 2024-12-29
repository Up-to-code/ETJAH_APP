"use server";
import { prisma } from "@/lib/db"

const CreateFolder = async (name: string) => {
    const response = await prisma.folder.create({
        data: {
            name: name
        },
    })
    return response
}
export default CreateFolder