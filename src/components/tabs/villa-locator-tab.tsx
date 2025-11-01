"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Villa, AuthProps } from '@/app/lib/types';
import { useToast } from '@/hooks/use-toast';
import { villaData } from '@/app/lib/villa-data';

const VillaLocatorTab = ({ isAdminLoggedIn }: AuthProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [villaDetails, setVillaDetails] = useState<Villa | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    const term = searchTerm.trim().toUpperCase();

    if (term === '') {
      setVillaDetails(null);
      setNotFound(false);
      return;
    }
    
    let formattedTerm = term;
    if (!term.includes('-')) {
        // Try to guess the prefix if not provided, e.g., '1' -> 'A-001' or 'B-001' etc.
        const potentialKeys = Object.keys(villaData).filter(key => {
            const keyParts = key.split('-');
            return keyParts.length === 2 && parseInt(keyParts[1], 10) === parseInt(term, 10);
        });

        if (potentialKeys.length > 0) {
            // For simplicity, we can take the first match. Or we can show a list to select from.
            // Here, we'll just inform the user to be more specific.
            if(potentialKeys.length > 1) {
                toast({ title: "Multiple villas found", description: `Please be more specific, e.g., ${potentialKeys.join(', ')}`, variant: 'default' });
                return;
            }
            formattedTerm = potentialKeys[0];
        }
    } else {
         const parts = term.split('-');
         if (parts.length === 2 && parts[1]) {
            formattedTerm = `${parts[0]}-${parts[1].padStart(3, '0')}`;
         }
    }


    const foundVilla = villaData[formattedTerm];

    if (foundVilla) {
      setVillaDetails({ ...foundVilla, id: formattedTerm });
      setNotFound(false);
    } else {
      setVillaDetails(null);
      setNotFound(true);
    }
  };

  return (
    <div className="space-y-6">
       <Card className="border-primary-foreground bg-secondary/50">
        <CardContent className="p-4 text-center text-sm text-foreground">
          <p>
            This portal is made only to help the <b className="font-semibold">Saima family</b>. It’s an independent project, not an official management app.
             For any concerns, contact via WhatsApp: 0322-8844488
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary">Find Your Villa</CardTitle>
          <CardDescription>Enter a villa number (e.g., A-01, B-252) to find its details.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input
            type="text"
            placeholder="Search by villa number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {if(e.key === 'Enter') handleSearch()}}
            className="text-lg"
          />
          <Button onClick={handleSearch}>Find</Button>
        </CardContent>
      </Card>

      {villaDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">{villaDetails.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="border-l-4 border-primary pl-3">
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p className="text-lg font-semibold">{villaDetails.category}</p>
                </div>
                <div className="border-l-4 border-primary pl-3">
                    <p className="text-sm font-medium text-muted-foreground">Street</p>
                    <p className="text-lg font-semibold">{villaDetails.street}</p>
                </div>
                <div className="border-l-4 border-primary pl-3">
                    <p className="text-sm font-medium text-muted-foreground">Block</p>
                    <p className="text-lg font-semibold">{villaDetails.block}</p>
                </div>
                 <div className="border-l-4 border-primary pl-3">
                    <p className="text-sm font-medium text-muted-foreground">Villa Number</p>
                    <p className="text-lg font-semibold">{villaDetails.id}</p>
                </div>
            </div>
             <div className="border-l-4 border-primary pl-3">
                <p className="text-sm font-medium text-muted-foreground">Directions</p>
                <p className="text-lg font-semibold">{villaDetails.residents || '-'}</p>
            </div>

            <div className="col-span-2 pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Location Map</p>
              <div className="rounded-lg overflow-hidden border">
                <iframe
                  src={villaDetails.mapLink}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {notFound && searchTerm && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Villa "{searchTerm}" not found. Please check the number and try again.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VillaLocatorTab;
