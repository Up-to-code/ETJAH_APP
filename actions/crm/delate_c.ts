// actions/crm/delete.ts
"use server";

import { prisma } from "@/lib/db";
 
export async function deleteCustomer(id: string) {
  try {
    // Delete the customer from the database
    await prisma.cRM_Customer.delete({
      where: { id },
    });

    // Revalidate the CRM page to reflect the changes
 
    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { error: "Failed to delete customer. Please try again." };
  }
}