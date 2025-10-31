"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface PhoneVerifyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVerifySuccess: (phone: string) => void;
  purpose?: string;
}

const PhoneVerifyDialog = ({ isOpen, onOpenChange, onVerifySuccess, purpose = "post an ad" }: PhoneVerifyDialogProps) => {
  const [phone, setPhone] = useState('');
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleVerify = async () => {
    if (!phone || !firestore) {
      toast({ title: 'Please enter your phone number.', variant: 'destructive' });
      return;
    }

    const phoneRef = doc(firestore, 'approvedPhones', phone);
    try {
        const docSnap = await getDoc(phoneRef);
        if(docSnap.exists()) {
            toast({ title: 'Verification successful.' });
            onVerifySuccess(phone);
        } else {
            toast({ title: 'This phone number is not approved.', description: 'Please contact admin for approval.', variant: 'destructive' });
        }
    } catch (e) {
        toast({ title: 'Could not verify phone number.', variant: 'destructive' });
    }
  };
  
  const handleClose = (open: boolean) => {
    if (!open) {
      setPhone('');
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <CardTitle className="font-headline">Phone Verification</CardTitle>
          <CardDescription>
            {`To ${purpose}, please enter your approved phone number.`}
          </CardDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            id="verify-phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
          <Button type="button" onClick={handleVerify}>Verify</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneVerifyDialog;
