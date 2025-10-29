"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import type { Complaint, VillaData } from '@/app/lib/types';

interface ComplaintFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (complaint: Complaint) => void;
  complaintToEdit?: Complaint | null;
  villaData: VillaData;
}

const ComplaintFormDialog = ({ isOpen, onOpenChange, onSave, complaintToEdit, villaData }: ComplaintFormDialogProps) => {
  const { toast } = useToast();
  
  const complaintSchema = z.object({
    villa: z.string().min(3, "Villa number is required.").refine(
        (val) => {
            const upperVal = val.trim().toUpperCase();
            let formattedVal = upperVal;
            if (upperVal.includes('-')) {
                const parts = upperVal.split('-');
                 if (parts.length === 2 && parts[1]) {
                    formattedVal = `${parts[0]}-${parts[1].padStart(3, '0')}`;
                }
            }
            return Object.keys(villaData).includes(formattedVal);
        },
        { message: "Please enter a valid villa number." }
    ),
    title: z.string().min(5, "Title must be at least 5 characters.").max(50),
    description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  });

  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      villa: '',
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (complaintToEdit) {
        form.reset({
          villa: complaintToEdit.villa,
          title: complaintToEdit.title,
          description: complaintToEdit.description,
        });
      } else {
        form.reset({ villa: '', title: '', description: '' });
      }
    }
  }, [isOpen, complaintToEdit, form]);

  const onSubmit = (data: z.infer<typeof complaintSchema>) => {
    const newComplaint: Complaint = {
      id: complaintToEdit?.id || Date.now().toString(),
      timestamp: complaintToEdit?.timestamp || Date.now(),
      noted: complaintToEdit?.noted || false,
      resolved: complaintToEdit?.resolved || false,
      ...data,
    };
    onSave(newComplaint);
    toast({ title: `Complaint ${complaintToEdit ? 'updated' : 'submitted'} successfully.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">{complaintToEdit ? 'Edit' : 'Submit'} Complaint</DialogTitle>
          <DialogDescription>Please provide details about your issue. Your complaint will be reviewed by management.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="villa" render={({ field }) => (<FormItem><FormLabel>Your Villa Number</FormLabel><FormControl><Input placeholder="e.g., A-01, B-252" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Complaint Title</FormLabel><FormControl><Input placeholder="Brief title of your complaint" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Complaint Details</FormLabel><FormControl><Textarea placeholder="Describe your complaint in detail..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Submit Complaint</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ComplaintFormDialog;
