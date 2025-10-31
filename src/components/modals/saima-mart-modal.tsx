"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { martStatuses, type MartStatus } from '@/app/lib/types';

interface SaimaMartModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  martStatus: MartStatus;
  setMartStatus: (status: MartStatus) => void;
  isAdminLoggedIn: boolean;
}

const MART_OWNER_PASSWORD = "salesman";

const SaimaMartModal = ({ isOpen, onOpenChange, martStatus, setMartStatus, isAdminLoggedIn }: SaimaMartModalProps) => {
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const canManage = isOwnerLoggedIn || isAdminLoggedIn;

  const getStatusText = (status: MartStatus) => {
    switch (status) {
      case 'Open':
        return 'The mart is currently open.';
      case 'Closed':
        return 'The mart is currently closed.';
      case 'Namaz Break':
        return 'The mart is temporarily closed for a Namaz break.';
      case 'Lunch/Dinner Time':
        return 'The mart is temporarily closed for a lunch/dinner break.';
      default:
        return 'The mart is currently closed.';
    }
  };

  const getStatusColor = (status: MartStatus) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Closed':
        return 'bg-red-500';
      case 'Namaz Break':
      case 'Lunch/Dinner Time':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const handleLogin = () => {
    if (password === MART_OWNER_PASSWORD) {
      setIsOwnerLoggedIn(true);
      toast({ title: 'Mart owner login successful.' });
      setPassword('');
    } else {
      toast({ title: 'Invalid password.', variant: 'destructive' });
      setPassword('');
    }
  };
  
  const handleLogout = () => {
    setIsOwnerLoggedIn(false);
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      // Reset login state when modal is closed, unless admin is logged in globally
      if (!isAdminLoggedIn) {
        setIsOwnerLoggedIn(false);
      }
      setPassword('');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="text-4xl">🛒</div>
          <DialogTitle className="font-headline text-2xl">Saima Mart</DialogTitle>
          <DialogDescription>
            Check the current status of the community mart.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-4 rounded-md border p-6 my-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Mart Status
            </p>
            <p className="text-sm text-muted-foreground">
              {getStatusText(martStatus)}
            </p>
          </div>
          <div className={`w-4 h-4 rounded-full shadow-inner ${getStatusColor(martStatus)}`} />
        </div>
        
        {canManage ? (
          <div className="space-y-4">
             <div className="p-4 bg-muted/50 rounded-lg">
                <Label className="mb-4 block text-center">Update Mart Status</Label>
                <RadioGroup
                    value={martStatus}
                    onValueChange={(value: MartStatus) => setMartStatus(value)}
                    className="grid grid-cols-2 gap-4"
                >
                    {martStatuses.map((status) => (
                         <div key={status} className="flex items-center space-x-2">
                            <RadioGroupItem value={status} id={`status-${status}`} />
                            <Label htmlFor={`status-${status}`}>{status}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            {isOwnerLoggedIn && !isAdminLoggedIn && <Button variant="outline" className="w-full" onClick={handleLogout}>Owner Logout</Button>}
          </div>
        ) : (
          <div className="space-y-4">
            <Label htmlFor="owner-password">Mart Owner Login</Label>
            <div className="flex gap-2">
                <Input 
                    id="owner-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button onClick={handleLogin}>Login</Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="secondary" onClick={() => handleOpenChange(false)} className="w-full">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaimaMartModal;
