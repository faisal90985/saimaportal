"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { villaData as initialVillaData } from '@/app/lib/data';
import type { Villa, AuthProps } from '@/app/lib/types';
import { useToast } from '@/hooks/use-toast';

const VillaLocatorTab = ({ isAdminLoggedIn }: AuthProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [villaDetails, setVillaDetails] = useState<Villa | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [villaData, setVillaData] = useState(initialVillaData);
  const { toast } = useToast();

  const [residents, setResidents] = useState('');
  const [currentVilla, setCurrentVilla] = useState('');

  const handleSearch = (term: string) => {
    const upperTerm = term.trim().toUpperCase();
    setSearchTerm(term);

    if (upperTerm === '') {
      setVillaDetails(null);
      setNotFound(false);
      return;
    }

    let formattedTerm = upperTerm;
    if (upperTerm.includes('-')) {
      const parts = upperTerm.split('-');
      if (parts.length === 2 && parts[1]) {
        formattedTerm = `${parts[0]}-${parts[1].padStart(3, '0')}`;
      }
    }
    
    const villa = villaData[formattedTerm];

    if (villa) {
      setVillaDetails(villa);
      setNotFound(false);
      setCurrentVilla(formattedTerm);
      setResidents(villa.residents || '');
    } else {
      setVillaDetails(null);
      setNotFound(true);
      setCurrentVilla('');
    }
  };

  const handleUpdateResidents = () => {
    if (isAdminLoggedIn && currentVilla) {
        const updatedVillaData = { ...villaData, [currentVilla]: { ...villaData[currentVilla], residents: residents }};
        setVillaData(updatedVillaData);
        setVillaDetails(updatedVillaData[currentVilla]);
        toast({ title: "Resident info updated successfully." });
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
        <CardContent>
          <Input
            type="text"
            placeholder="Search by villa number..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="text-lg"
          />
        </CardContent>
      </Card>

      {villaDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-primary">{currentVilla}</CardTitle>
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
                    <p className="text-lg font-semibold">{currentVilla}</p>
                </div>
            </div>
             <div className="border-l-4 border-primary pl-3">
                <p className="text-sm font-medium text-muted-foreground">Resident Info</p>
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

      {isAdminLoggedIn && villaDetails && (
         <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg">Update Resident Info (Admin)</CardTitle>
                <CardDescription>Update the resident info for villa {currentVilla}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input
                    placeholder="Enter resident info"
                    value={residents}
                    onChange={(e) => setResidents(e.target.value)}
                />
                <Button onClick={handleUpdateResidents} className="w-full">Update Resident Info</Button>
            </CardContent>
         </Card>
      )}
    </div>
  );
};

export default VillaLocatorTab;
