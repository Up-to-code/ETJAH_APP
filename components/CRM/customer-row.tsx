import { useState } from 'react';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
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
import { Customer } from '@/types/types';
import { formatDateTime } from '@/lib/dateTime';

// ... (keep the existing Customer interface)

interface CustomerRowProps {
  customer: Customer;
  filteredCustomers: Customer[];
  onDeleteCustomer: (id: string) => void; // Add this prop
}

export default function CustomerRow({ customer, filteredCustomers, onDeleteCustomer }: CustomerRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // ... (keep the existing formatDateTime function)

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteCustomer(customer.id);
    setIsDeleteDialogOpen(false);
  };

  if (filteredCustomers.length === 0) {
    // ... (keep the existing empty state rendering)
  }

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
              <DropdownMenuItem>
                <Pencil className="mr-2 size-4" />
                Edit
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
    </>
  );
}

