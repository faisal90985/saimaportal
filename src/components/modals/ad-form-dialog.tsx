"use client";

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { adCategories, type Ad, type AdCategory } from '@/app/lib/types';
import { AD_EXPIRY_HOURS } from '@/app/lib/data';

const adSchema = z.object({
  category: z.enum(adCategories, { required_error: "Please select a category." }),
  title: z.string().min(5, "Title must be at least 5 characters.").max(50),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  phone: z.string().min(10, "A valid phone number is required."),
  // Car pooling fields (optional)
  poolTime: z.string().optional(),
  poolSeats: z.string().optional(),
  poolArea: z.string().optional(),
  poolCharges: z.string().optional(),
  poolCar: z.string().optional(),
});

interface AdFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (ad: Ad) => void;
  phone: string | null;
  adToEdit?: Ad | null;
}

const AdFormDialog = ({ isOpen, onOpenChange, onSave, phone, adToEdit }: AdFormDialogProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof adSchema>>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      title: '',
      description: '',
      phone: '',
      poolTime: '',
      poolSeats: '',
      poolArea: '',
      poolCharges: '',
      poolCar: '',
    },
  });

  const category = form.watch('category');

  useEffect(() => {
    if (isOpen) {
      if (adToEdit) {
        form.reset({
          category: adToEdit.category,
          title: adToEdit.title,
          description: adToEdit.description,
          phone: adToEdit.phone,
          poolTime: adToEdit.poolTime,
          poolSeats: adToEdit.poolSeats,
          poolArea: adToEdit.poolArea,
          poolCharges: adToEdit.poolCharges,
          poolCar: adToEdit.poolCar,
        });
      } else {
        form.reset({
            title: '', description: '', phone: phone || '', category: undefined,
            poolTime: '', poolSeats: '', poolArea: '', poolCharges: '', poolCar: '',
        });
      }
    }
  }, [isOpen, adToEdit, phone, form]);

  const onSubmit = (data: z.infer<typeof adSchema>) => {
    const newAd: Ad = {
      id: adToEdit?.id || Date.now().toString(),
      expiry: Date.now() + (AD_EXPIRY_HOURS * 3600 * 1000),
      ...data,
    };
    onSave(newAd);
    toast({ title: `Advertisement ${adToEdit ? 'updated' : 'posted'} successfully.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline">{adToEdit ? 'Edit' : 'Post'} Advertisement</DialogTitle>
          <DialogDescription>Fill in the details for your ad. It will be visible for {AD_EXPIRY_HOURS} hours.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {adCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {category === 'Car Pooling' && (
              <div className="p-4 border rounded-md space-y-4 bg-muted/50">
                  <h4 className="font-medium text-sm">Car Pooling Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="poolTime" render={({ field }) => (<FormItem><FormLabel>Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="poolSeats" render={({ field }) => (<FormItem><FormLabel>Seats</FormLabel><FormControl><Input type="number" placeholder="e.g. 3" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="poolArea" render={({ field }) => (<FormItem><FormLabel>Area</FormLabel><FormControl><Input placeholder="e.g. DHA" {...field} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="poolCharges" render={({ field }) => (<FormItem><FormLabel>Charges</FormLabel><FormControl><Input type="number" placeholder="Per seat" {...field} /></FormControl></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="poolCar" render={({ field }) => (<FormItem><FormLabel>Car Model</FormLabel><FormControl><Input placeholder="e.g. Toyota Corolla" {...field} /></FormControl></FormItem>)} />
              </div>
            )}
            
            <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g., Brand New Sofa" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe your item or service..." {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} readOnly={!!phone && !adToEdit} /></FormControl><FormMessage /></FormItem>)} />
            
            <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Submit Advertisement</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdFormDialog;
