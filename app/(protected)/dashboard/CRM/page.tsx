// app/dashboard/CRM/page.tsx
"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomerRow from "@/components/CRM/customer-row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { getCustomers } from "@/actions/crm/get_data";
import { Customer } from "@/types/types";
import { deleteCustomer } from "@/actions/crm/delate_c";
import { toast } from "sonner";

export default function CRMPage() {
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]); // State to store fetched customers
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [page, setPage] = useState(0); // State to handle pagination

  // Fetch customers from the Server Action
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await getCustomers(page); // Call the Server Action
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page]); // Re-fetch when the page changes

  // Filter customers based on type
  const filteredCustomers = typeFilter
    ? customers.filter((customer) => customer.type === typeFilter)
    : customers;

  // Handle customer deletion
  const handleDeleteCustomer = async (id: string) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    try {
      await deleteCustomer(id);
      toast.success("Customer Deleted", {
        description: "The customer has been successfully deleted.",
      });
    } catch (error) {
      toast.error("Error Deleting Customer", {
        description:
          "There was an error deleting the customer. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">
        Customer Relationship Management
      </h1>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search customers..."
              className="max-w-sm"
            />
          </div>
          <Select onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
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
        <Link href="/dashboard/CRM/create_c">
          <Button>
            <PlusCircle className="mr-2 size-4" /> Add Customer
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  filteredCustomers={filteredCustomers}
                  onDeleteCustomer={handleDeleteCustomer}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        {customers.length > 0 && (
          <Button variant="outline" onClick={() => setPage((prev) => prev + 1)}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
