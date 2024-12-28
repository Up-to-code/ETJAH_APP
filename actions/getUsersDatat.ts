"use server";

import { prisma } from "@/lib/db";

export async function fetchUsers() {
  const data = await prisma.user.findMany();
  console.log("Data:", data);
  return data;
}

export async function fetchUser(id: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log("Data:", data);
  return data;
}
