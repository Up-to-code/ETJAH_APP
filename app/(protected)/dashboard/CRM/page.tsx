"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusCircle } from 'lucide-react';
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
import Link from "next/link";
import { getCustomers } from "@/actions/crm/get_data";
import { Customer } from "@/types/types";
import { deleteCustomer } from "@/actions/crm/delate_c";
import { toast } from "sonner";
import debounce from "lodash/debounce";

export default function CRMPage() {
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const { data, total } = await getCustomers(page, searchTerm, typeFilter);
      setCustomers(data);
      setTotalCustomers(total);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, typeFilter]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setPage(0);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value.trim() === "" ? undefined : value);
    setPage(0);
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      toast.success("Customer Deleted", {
        description: "The customer has been successfully deleted.",
      });
      fetchCustomers();
    } catch (error) {
      toast.error("Error Deleting Customer", {
        description:
          "There was an error deleting the customer. Please try again.",
      });
    }
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
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
              onChange={handleSearchChange}
              className="max-w-sm"
            />
          </div>
          <Input
            type="text"
            placeholder="Filter by type..."
            onChange={(e) => handleTypeFilterChange(e.target.value)}
            className="w-[180px]"
          />
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
            ) : customers.length > 0 ? (
              customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onDeleteCustomer={handleDeleteCustomer}
                  onCustomerUpdated={handleEditCustomer}
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
      <div className="mt-6 flex items-center justify-between">
        <div>
          Showing {page * 10 + 1}-{Math.min((page + 1) * 10, totalCustomers)} of{" "}
          {totalCustomers} customers
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={(page + 1) * 10 >= totalCustomers}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

