"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CRM_Customer } from "@prisma/client";
import { updateCustomer } from "@/actions/crm/updatedCustomer";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Phone must be at least 5 characters.",
  }),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  note: z.string(),
  time: z.date({
    required_error: "Please select a date and time",
  }),
  com_from: z.string().min(2, {
    message: "From must be at least 2 characters.",
  }),
});

interface EditCustomerFormProps {
  customer: CRM_Customer;
  onEditComplete: (updatedCustomer: CRM_Customer) => void;
}

export function EditCustomerForm({
  customer,
  onEditComplete,
}: EditCustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      type: customer.type,
      note: customer.note,
      time: customer.time,
      com_from: customer.com_from,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const updatedCustomer = await updateCustomer({
        id: customer.id,
        ...values,
      });
      onEditComplete(updatedCustomer);
      toast.success("Customer Updated", {
        description: "The customer has been successfully updated.",
      });
      router.refresh();
    } catch (error) {
      toast.error("Error Updating Customer", {
        description:
          "There was an error updating the customer. Please try again.",
      });
      console.error("Failed to update customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[100px] w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP HH:mm")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t p-3">
                    <Input
                      type="time"
                      value={field.value ? format(field.value, "HH:mm") : ""}
                      onChange={(e) => {
                        const date = field.value || new Date();
                        const [hours, minutes] = e.target.value.split(":");
                        date.setHours(parseInt(hours), parseInt(minutes));
                        field.onChange(date);
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="com_from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Customer"}
        </Button>
      </form>
    </Form>
  );
}
