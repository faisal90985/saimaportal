"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { namazTimings as initialTimings } from '@/app/lib/data';
import type { NamazTimings, AuthProps } from '@/app/lib/types';
import { Separator } from '../ui/separator';

interface MasjidModalProps extends AuthProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MasjidModal = ({ isOpen, onOpenChange, isAdminLoggedIn }: MasjidModalProps) => {
  const [timings, setTimings] = useState<NamazTimings>(initialTimings);
  const [editMode, setEditMode] = useState(false);
  const [editedTimings, setEditedTimings] = useState<NamazTimings>(timings);
  const { toast } = useToast();

  const handleSave = () => {
    setTimings(editedTimings);
    setEditMode(false);
    toast({ title: 'Namaz timings updated successfully.' });
  };
  
  const handleCancel = () => {
    setEditedTimings(timings);
    setEditMode(false);
  }
  
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "Not set";
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTimings(prev => ({...prev, [name]: value}));
  };

  const namazRows = [
    { name: 'Fajr', time: formatTime(timings.fajr) },
    { name: 'Zuhar', time: formatTime(timings.zuhar) },
    { name: 'Asar', time: formatTime(timings.asar) },
    { name: 'Maghrib', time: formatTime(timings.maghrib) },
    { name: 'Isha', time: formatTime(timings.isha) },
    { name: 'Jumma', time: formatTime(timings.jumma) },
  ];

  const staffRows = [
      { role: 'Imam', name: timings.imam },
      { role: 'Moazin', name: timings.moazin },
      { role: 'Khadim', name: timings.khadim },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">🕌 Masjid Namaz Timings</DialogTitle>
        </DialogHeader>
        
        {!editMode ? (
        <>
            <div className="space-y-2 py-4">
                {namazRows.map(row => (
                    <div key={row.name} className="flex justify-between items-center text-lg">
                        <span className="font-semibold text-primary">{row.name}</span>
                        <span className="font-mono font-medium">{row.time}</span>
                    </div>
                ))}
            </div>
            <Separator />
            <div className="space-y-2 py-4">
                 {staffRows.map(row => (
                    <div key={row.role} className="flex justify-between items-center text-md">
                        <span className="font-semibold text-muted-foreground">{row.role}</span>
                        <span className="font-medium">{row.name}</span>
                    </div>
                ))}
            </div>
        </>
        ) : (
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(timings).filter(k => k !== 'imam' && k !== 'moazin' && k !== 'khadim').map(key => (
                         <div key={key} className="space-y-2">
                            <Label htmlFor={`edit-${key}`} className="capitalize">{key}</Label>
                            <Input id={`edit-${key}`} name={key} type="time" value={editedTimings[key as keyof NamazTimings]} onChange={handleInputChange} />
                        </div>
                    ))}
                </div>
                 <Separator />
                 <div className="space-y-2">
                    <Label htmlFor="edit-imam">Imam Name</Label>
                    <Input id="edit-imam" name="imam" value={editedTimings.imam} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="edit-moazin">Moazin Name</Label>
                    <Input id="edit-moazin" name="moazin" value={editedTimings.moazin} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="edit-khadim">Khadim Name</Label>
                    <Input id="edit-khadim" name="khadim" value={editedTimings.khadim} onChange={handleInputChange} />
                </div>
            </div>
        )}
        
        <DialogFooter className="sm:justify-between">
            <div>
            {isAdminLoggedIn && !editMode && <Button variant="outline" onClick={() => setEditMode(true)}>Edit Timings</Button>}
            </div>
            <div className='flex gap-2'>
            {editMode ? (
                <>
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
                </>
            ) : (
                <Button onClick={() => onOpenChange(false)}>Close</Button>
            )}
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MasjidModal;
