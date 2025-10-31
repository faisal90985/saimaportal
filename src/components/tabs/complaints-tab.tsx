"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { villaData as initialVillaData } from '@/app/lib/data';
import type { Complaint, AuthProps, VillaData } from '@/app/lib/types';
import { PlusCircle, FileText } from 'lucide-react';
import PhoneVerifyDialog from '@/components/modals/phone-verify-dialog';
import ComplaintFormDialog from '@/components/modals/complaint-form-dialog';
import ComplaintCard from '@/components/complaint-card';
import { useFirestore, useCollection, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const ComplaintsTab = ({ isAdminLoggedIn, isManagementLoggedIn }: AuthProps) => {
  const firestore = useFirestore();
  const { user } = useUser();
  const [dialog, setDialog] = useState<'verify' | 'form' | null>(null);
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const [villaData, setVillaData] = useState<VillaData>({});

  const complaintsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'complaints'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: complaints, isLoading } = useCollection<Complaint>(complaintsQuery);

  const villasQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'villas');
  }, [firestore]);
  const { data: villasData } = useCollection<any>(villasQuery);

  useState(() => {
    if (villasData) {
      const data: VillaData = {};
      villasData.forEach(villa => {
        data[villa.id] = villa;
      });
      setVillaData(data);
    }
  });


  const handlePostComplaintClick = () => {
    setEditingComplaint(null);
    setDialog('verify');
  };
  
  const handleVerifySuccess = (phone: string) => {
    setVerifiedPhone(phone); // phone is not directly used for complaints but flow requires it
    setDialog('form');
  };

  const handleSaveComplaint = (newComplaint: Complaint) => {
    if (!firestore) return;
    if (editingComplaint) {
      const complaintRef = doc(firestore, 'complaints', newComplaint.id);
      setDocumentNonBlocking(complaintRef, newComplaint, { merge: true });
    } else {
      const complaintsRef = collection(firestore, 'complaints');
      addDocumentNonBlocking(complaintsRef, newComplaint);
    }
    setDialog(null);
    setEditingComplaint(null);
  };

  const handleDeleteComplaint = (id: string) => {
    if (!firestore) return;
    const complaintRef = doc(firestore, 'complaints', id);
    deleteDocumentNonBlocking(complaintRef);
  };
  
  const handleEditComplaint = (complaint: Complaint) => {
    setEditingComplaint(complaint);
    setDialog('form');
  };

  const handleStatusChange = (id: string, field: 'noted' | 'resolved', value: boolean) => {
    if (!firestore) return;
    const complaintRef = doc(firestore, 'complaints', id);
    const updateData: any = { [field]: value };
    if (field === 'resolved' && value) {
      updateData.resolvedDate = Date.now();
    }
    updateDocumentNonBlocking(complaintRef, updateData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline">Complaints</CardTitle>
          <Button size="sm" onClick={handlePostComplaintClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post Complaint
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && <p>Loading complaints...</p>}
          {!isLoading && complaints && complaints.length > 0 ? (
            complaints.map(complaint => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onEdit={handleEditComplaint}
                onDelete={handleDeleteComplaint}
                onStatusChange={handleStatusChange}
                canManage={isAdminLoggedIn || isManagementLoggedIn}
              />
            ))
          ) : (
            !isLoading && (
            <div className="text-center text-muted-foreground py-10">
              <FileText className="mx-auto h-12 w-12" />
              <p className="mt-4">No complaints submitted yet.</p>
            </div>
            )
          )}
        </CardContent>
      </Card>

      <PhoneVerifyDialog
        isOpen={dialog === 'verify'}
        onOpenChange={(open) => !open && setDialog(null)}
        approvedPhones={[]} // Replace with real approved phones from firebase
        onVerifySuccess={handleVerifySuccess}
        purpose="post a complaint"
      />
      
      <ComplaintFormDialog
        isOpen={dialog === 'form'}
        onOpenChange={(open) => !open && setDialog(null)}
        onSave={handleSaveComplaint}
        complaintToEdit={editingComplaint}
        villaData={villaData}
      />
    </div>
  );
};

export default ComplaintsTab;
