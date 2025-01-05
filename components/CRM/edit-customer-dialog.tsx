import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Customer } from '@/types/types';

interface EditCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedCustomer: Customer) => void;
  customer: Customer;
}

export function EditCustomerDialog({ isOpen, onClose, onConfirm, customer }: EditCustomerDialogProps) {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    onConfirm(editedCustomer);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedCustomer.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input
              id="type"
              name="type"
              value={editedCustomer.type}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="com_from" className="text-right">
              From
            </Label>
            <Input
              id="com_from"
              name="com_from"
              value={editedCustomer.com_from}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleConfirm}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

