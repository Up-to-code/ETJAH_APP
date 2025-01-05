'use server'

import { revalidatePath } from 'next/cache'
 import { CRM_Customer } from '@prisma/client'
import { prisma } from '@/lib/db'

export async function updateCustomer(data: Omit<CRM_Customer, 'createdAt' | 'updatedAt'>): Promise<CRM_Customer> {
  const updatedCustomer = await prisma.cRM_Customer.update({
    where: { id: data.id },
    data: {
      name: data.name,
      phone: data.phone,
      type: data.type,
      note: data.note,
      time: data.time,
      com_from: data.com_from,
    },
  })

  revalidatePath('/customers')
  return updatedCustomer
}

