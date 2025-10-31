"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { NamazTimings, AuthProps } from '@/app/lib/types';
import { Separator } from '../ui/separator';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

interface MasjidModalProps extends Omit<AuthProps, 'isManagementLoggedIn' | 'setIsManagementLoggedIn' | 'isMartOwnerLoggedIn' | 'setIsMartOwnerLoggedIn'>{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MasjidModal = ({ isOpen, onOpenChange, isAdminLoggedIn }: MasjidModalProps) => {
  const firestore = useFirestore();
  const timingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'namazTimings', 'times') : null, [firestore]);
  const { data: timingsData, isLoading } = useDoc<NamazTimings>(timingsRef);

  const [timings, setTimings] = useState<NamazTimings | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTimings, setEditedTimings] = useState<NamazTimings | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (timingsData) {
      setTimings(timingsData);
      setEditedTimings(timingsData);
    }
  }, [timingsData]);

  const handleSave = () => {
    if (editedTimings && firestore) {
      setDocumentNonBlocking(doc(firestore, 'namazTimings', 'times'), editedTimings, { merge: true });
      setTimings(editedTimings);
      setEditMode(false);
      toast({ title: 'Namaz timings updated successfully.' });
    }
  };
  
  const handleCancel = () => {
    setEditedTimings(timings);
    setEditMode(false);
  }
  
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "Not set";
    const [hours, minutes] = timeStr.split(':');
    if(isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) return "Invalid Time";
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(editedTimings) {
      setEditedTimings(prev => ({...prev!, [name]: value}));
    }
  };

  if (isLoading || !timings || !editedTimings) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent><DialogHeader><DialogTitle>Loading Timings...</DialogTitle></DialogHeader></DialogContent>
        </Dialog>
    )
  }

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
