"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { contactTypes, type EmergencyContact, type ContactType } from '@/app/lib/types';

const contactSchema = z.object({
  type: z.enum(contactTypes, { required_error: "Please select a contact type." }),
  name: z.string().min(3, "Name is required.").max(50),
  phone: z.string().min(10, "A valid phone number is required."),
  description: z.string().max(200).optional(),
});

interface EmergencyContactFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: EmergencyContact) => void;
}

const EmergencyContactFormDialog = ({ isOpen, onOpenChange, onSave }: EmergencyContactFormDialogProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '', description: '' },
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...data,
    };
    onSave(newContact);
    toast({ title: 'Emergency contact added successfully.' });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">Add Emergency Contact</DialogTitle>
          <DialogDescription>Add a new service provider to the directory. This will be visible to all residents.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {contactTypes.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input placeholder="e.g., Ali Ahmed" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="0300-1234567" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description/Notes (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., 24/7 service, reasonable rates" {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Add Contact</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyContactFormDialog;
