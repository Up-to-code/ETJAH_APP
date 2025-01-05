"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getCustomers(
  page: number,
  searchTerm?: string,
  typeFilter?: string
) {
  try {
    let whereClause: Prisma.CRM_CustomerWhereInput = {};

    if (searchTerm) {
      whereClause.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { phone: { contains: searchTerm, mode: "insensitive" } },
        { note: { contains: searchTerm, mode: "insensitive" } },
        { com_from: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    if (typeFilter) {
      whereClause.type = { contains: typeFilter, mode: "insensitive" };
    }

    const [data, total] = await Promise.all([
      prisma.cRM_Customer.findMany({
        where: whereClause,
        skip: page * 10,
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
      prisma.cRM_Customer.count({ where: whereClause }),
    ]);

    return { data, total };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
}

