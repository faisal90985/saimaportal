"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { AuthProps, EmergencyContact } from '@/app/lib/types';
import { emergencyContacts as initialContacts } from '@/app/lib/data';
import EmergencyContactCard from '@/components/emergency-contact-card';
import EmergencyContactFormDialog from '@/components/modals/emergency-contact-form-dialog';


const EmergencyTab = ({isAdminLoggedIn, isManagementLoggedIn}: AuthProps) => {
    const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const canAddContact = isAdminLoggedIn || isManagementLoggedIn;

    const handleSaveContact = (newContact: EmergencyContact) => {
        setContacts([...contacts, newContact]);
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
          {contacts.map(contact => (
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
