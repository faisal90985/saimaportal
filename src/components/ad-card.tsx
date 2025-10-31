"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Phone, Clock, Car, MapPin, Armchair, CircleDollarSign } from 'lucide-react';
import type { Ad } from '@/app/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Input } from './ui/input';

interface AdCardProps {
  ad: Ad;
  onEdit: (ad: Ad) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

const AdCard = ({ ad, onEdit, onDelete, isAdmin }: AdCardProps) => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [phone, setPhone] = useState('');
  const [action, setAction] = useState<'edit' | 'delete' | null>(null);

  const now = Date.now();
  const hoursLeft = Math.max(0, Math.ceil((ad.expiry - now) / (1000 * 60 * 60)));

  const handleAction = (type: 'edit' | 'delete') => {
    if (isAdmin) {
      if (type === 'edit') onEdit(ad);
      if (type === 'delete') {
          if (window.confirm("Are you sure you want to delete this ad?")) {
              onDelete(ad.id);
          }
      }
      return;
    }
    setAction(type);
    setIsVerifying(true);
  }

  const verifyAndExecute = () => {
    if (phone === ad.phone) {
      if (action === 'edit') onEdit(ad);
      if (action === 'delete') {
        if (window.confirm("Are you sure you want to delete this ad?")) {
            onDelete(ad.id);
        }
      }
      setIsVerifying(false);
      setPhone('');
      setAction(null);
    } else {
      toast({ title: "Invalid phone number", description: "You can only manage ads posted with your number.", variant: "destructive" });
    }
  }

  if (isVerifying) {
    return (
      <Card className="flex flex-col justify-center p-4">
        <p className="text-sm text-center mb-2">Enter phone number to {action} ad.</p>
        <div className="flex gap-2">
          <Input placeholder="Your phone number" value={phone} onChange={e => setPhone(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && verifyAndExecute()} />
          <Button onClick={verifyAndExecute}>Go</Button>
        </div>
        <Button variant="link" size="sm" onClick={() => setIsVerifying(false)} className="mt-1">Cancel</Button>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <Badge variant="secondary" className="mb-2">{ad.category}</Badge>
                <CardTitle className="font-headline text-lg">{ad.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction('edit')}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('delete')} className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground">{ad.description}</p>
        {ad.category === 'Car Pooling' && (
          <div className="text-sm space-y-2 text-foreground p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> <span>Time: {ad.poolTime || 'Flexible'}</span></div>
            <div className="flex items-center gap-2"><Armchair className="w-4 h-4 text-primary"/> <span>Seats: {ad.poolSeats || '1'} available</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary"/> <span>Area: {ad.poolArea || 'Various'}</span></div>
            <div className="flex items-center gap-2"><CircleDollarSign className="w-4 h-4 text-primary"/> <span>Charges: Rs. {ad.poolCharges || 'TBD'}/seat</span></div>
            <div className="flex items-center gap-2"><Car className="w-4 h-4 text-primary"/> <span>Car: {ad.poolCar || 'Not specified'}</span></div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 font-semibold text-primary">
            <Phone className="w-4 h-4"/>
            <span>{ad.phone}</span>
        </div>
        <div className={`flex items-center gap-1 ${hoursLeft < 6 ? 'text-destructive' : 'text-muted-foreground'}`}>
            <Clock className="w-4 h-4"/>
            <span>{hoursLeft}h left</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdCard;
