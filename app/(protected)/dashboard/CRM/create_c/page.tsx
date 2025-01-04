'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { addCustomer } from '@/actions/crm/create_c'; // Import the Server Action
import { toast } from 'sonner';

export default function AddCustomerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    com_from: '',
    time: new Date().toISOString().slice(0, 16), // Format: "YYYY-MM-DDTHH:mm"
    note: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call the Server Action to add the customer
      const result = await addCustomer(formData);

      // If the Server Action returns an error, display it
      if (result?.error) {
        toast.error('Error Adding Customer', {
          description: result.error,
        });
        return;
      }

      // Show success toast
      toast.success('Customer Added', {
        description: 'New customer has been successfully added to the CRM.',
      });

      // Redirect to the CRM page after successful creation
      router.push('/dashboard/CRM');
    } catch (error) {
      // Show error toast
      toast.error('Error Adding Customer', {
        description: 'There was an error adding the customer. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/dashboard/CRM" className="mb-4 flex items-center text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 size-4" />
        Back to CRM
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Add New Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Seller">Seller</SelectItem>
                  <SelectItem value="Bayer">Bayer</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Asker">Asker</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="com_from">Source</Label>
              <Textarea
                id="com_from"
                name="com_from"
                placeholder="Where did the customer come from? (e.g., website, referral)"
                value={formData.com_from}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Additional notes about the customer"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="datetime-local"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/dashboard/CRM')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Customer'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}