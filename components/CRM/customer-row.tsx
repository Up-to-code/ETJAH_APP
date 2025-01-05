'use client';

import { useState } from 'react';
import { MoreHorizontal, Eye, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { DeleteCustomerDialog } from './delete-customer-dialog';
import { CustomerDetailView } from './customer-detail-view';
import { CRM_Customer } from '@prisma/client';
import { formatDateTime } from '@/lib/dateTime';

interface CustomerRowProps {
  customer: CRM_Customer;
  onDeleteCustomer: (id: string) => void;
  onCustomerUpdated: (updatedCustomer: CRM_Customer) => void;
}

export default function CustomerRow({ customer, onDeleteCustomer, onCustomerUpdated }: CustomerRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteCustomer(customer.id);
    setIsDeleteDialogOpen(false);
  };

  const handleViewClick = () => {
    setIsDetailViewOpen(true);
  };

  return (
    <>
      <TableRow>
        <TableCell>{customer.name}</TableCell>
        <TableCell>{customer.type}</TableCell>
        <TableCell>{customer.com_from}</TableCell>
        <TableCell>{formatDateTime(customer.createdAt)}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleViewClick}>
                <Eye className="mr-2 size-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDeleteClick}>
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <DeleteCustomerDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        customerName={customer.name}
      />
      {isDetailViewOpen && (
        <CustomerDetailView
          customer={customer}
          onClose={() => setIsDetailViewOpen(false)}
          onCustomerUpdated={onCustomerUpdated}
        />
      )}
    </>
  );
}

