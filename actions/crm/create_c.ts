'use server';

import { prisma } from '@/lib/db';
 

export async function addCustomer(formData: {
  name: string;
  phone: string;
  type: string;
  com_from: string;
  time: string; // ISO string format
  note: string;
}) {
  try {
    // Create a new customer in the database
    await prisma.cRM_Customer.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        type: formData.type,
        com_from: formData.com_from,
        time: new Date(formData.time),
        note: formData.note,
      },
    });
 
  } catch (error) {
    console.error('Error adding customer:', error);
    // Return an error message instead of throwing an error
    return { error: 'Failed to add customer. Please try again.' };
  }
}