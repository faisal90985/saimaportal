"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { AuthProps, EmergencyContact } from '@/app/lib/types';
import EmergencyContactCard from '@/components/emergency-contact-card';
import EmergencyContactFormDialog from '@/components/modals/emergency-contact-form-dialog';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';


const EmergencyTab = ({isAdminLoggedIn, isManagementLoggedIn}: AuthProps) => {
    const firestore = useFirestore();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const contactsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'emergencyContacts'), orderBy('name'));
    }, [firestore]);

    const { data: contacts, isLoading } = useCollection<EmergencyContact>(contactsQuery);

    const canAddContact = isAdminLoggedIn || isManagementLoggedIn;

    const handleSaveContact = (newContact: EmergencyContact) => {
        if (!firestore) return;
        const contactsRef = collection(firestore, 'emergencyContacts');
        addDocumentNonBlocking(contactsRef, newContact);
        setIsFormOpen(false);
    }
  
  return (
     <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline">Emergency Contacts</CardTitle>
          {canAddContact && (
             <Button size="sm" onClick={() => setIsFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Contact
            </Button>
          )}
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p>Loading contacts...</p>}
          {!isLoading && contacts && contacts.map(contact => (
            <EmergencyContactCard key={contact.id} contact={contact} />
          ))}
        </CardContent>
      </Card>
      
      <EmergencyContactFormDialog 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveContact}
      />

    </div>
  );
};

export default EmergencyTab;
