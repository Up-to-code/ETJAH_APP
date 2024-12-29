"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { userNameSchema ,} from "@/lib/validations/user";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await auth()
    const IS_ADMIN = await getCurrentUser()
    
    // Check authorization
    if (!session?.user || (session.user.id !== userId && IS_ADMIN?.role !== UserRole.ADMIN)) {
      throw new Error("Unauthorized")
    }

    // Parse and validate name
    const { name } = userNameSchema.parse(data)

    // Update user name
    await prisma.user.update({
      where: { id: userId },
      data: { name }
    })

    revalidatePath('/dashboard/settings')
    return { status: "success" }

  } catch (error) {
    // console.log(error)
    return { status: "error" }
  }
}