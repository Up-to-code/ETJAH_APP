import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CRM_Customer } from '@prisma/client';
import { formatDateTime } from '@/lib/dateTime';
import { EditCustomerForm } from './edit-customer-form';
 
interface CustomerDetailViewProps {
  customer: CRM_Customer;
  onClose: () => void;
  onCustomerUpdated: (updatedCustomer: CRM_Customer) => void;
}

export function CustomerDetailView({ customer, onClose, onCustomerUpdated }: CustomerDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = (updatedCustomer: CRM_Customer) => {
    setIsEditing(false);
    onCustomerUpdated(updatedCustomer);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Customer' : 'Customer Details'}</DialogTitle>
        </DialogHeader>
        {isEditing ? (
          <EditCustomerForm customer={customer} onEditComplete={handleEditComplete} />
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Name:</span>
              <span className="col-span-3">{customer.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Phone:</span>
              <span className="col-span-3">{customer.phone}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Type:</span>
              <span className="col-span-3">{customer.type}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Note:</span>
              <span className="col-span-3">{customer.note}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Time:</span>
              <span className="col-span-3">{formatDateTime(customer.time)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">From:</span>
              <span className="col-span-3">{customer.com_from}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Created:</span>
              <span className="col-span-3">{formatDateTime(customer.createdAt)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Updated:</span>
              <span className="col-span-3">{formatDateTime(customer.updatedAt)}</span>
            </div>
            <Button onClick={handleEditClick}>Edit</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

