"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { complaints as initialComplaints, villaData } from '@/app/lib/data';
import type { Complaint, AuthProps } from '@/app/lib/types';
import { PlusCircle, FileText } from 'lucide-react';
import PhoneVerifyDialog from '@/components/modals/phone-verify-dialog';
import ComplaintFormDialog from '@/components/modals/complaint-form-dialog';
import ComplaintCard from '@/components/complaint-card';

const ComplaintsTab = ({ approvedPhones, isAdminLoggedIn, isManagementLoggedIn }: AuthProps) => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [dialog, setDialog] = useState<'verify' | 'form' | null>(null);
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);

  const handlePostComplaintClick = () => {
    setEditingComplaint(null);
    setDialog('verify');
  };
  
  const handleVerifySuccess = (phone: string) => {
    setVerifiedPhone(phone); // phone is not directly used for complaints but flow requires it
    setDialog('form');
  };

  const handleSaveComplaint = (newComplaint: Complaint) => {
    if (editingComplaint) {
      setComplaints(complaints.map(c => c.id === newComplaint.id ? newComplaint : c));
    } else {
      setComplaints([...complaints, newComplaint]);
    }
    setDialog(null);
    setEditingComplaint(null);
  };

  const handleDeleteComplaint = (id: string) => {
    setComplaints(complaints.filter(c => c.id !== id));
  };
  
  const handleEditComplaint = (complaint: Complaint) => {
    setEditingComplaint(complaint);
    setDialog('form');
  };

  const handleStatusChange = (id: string, field: 'noted' | 'resolved', value: boolean) => {
    setComplaints(complaints.map(c => {
      if (c.id === id) {
        const updatedComplaint = { ...c, [field]: value };
        if (field === 'resolved' && value) {
          updatedComplaint.resolvedDate = Date.now();
        }
        return updatedComplaint;
      }
      return c;
    }));
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
          {complaints.length > 0 ? (
            complaints.sort((a, b) => b.timestamp - a.timestamp).map(complaint => (
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
            <div className="text-center text-muted-foreground py-10">
              <FileText className="mx-auto h-12 w-12" />
              <p className="mt-4">No complaints submitted yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <PhoneVerifyDialog
        isOpen={dialog === 'verify'}
        onOpenChange={(open) => !open && setDialog(null)}
        approvedPhones={approvedPhones}
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
