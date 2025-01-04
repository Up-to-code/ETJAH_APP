"use server"; // Mark this function as a Server Action

import { prisma } from "@/lib/db";

export async function getCustomers(page: number) {
  try {
    const data = await prisma.cRM_Customer.findMany({
      skip: +(page || 0) * 10,
      take: 10,
    });

    return data; // Return the data directly (no need for NextResponse)
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
}