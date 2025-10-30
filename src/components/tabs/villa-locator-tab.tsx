"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { villaData as initialVillaData } from '@/app/lib/data';
import type { Villa, AuthProps } from '@/app/lib/types';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const VillaLocatorTab = ({ isAdminLoggedIn }: AuthProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [villaDetails, setVillaDetails] = useState<Villa | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [villaData, setVillaData] = useState(initialVillaData);
  const { toast } = useToast();

  const [residents, setResidents] = useState('');
  const [currentVilla, setCurrentVilla] = useState('');

  const mapPlaceholder = PlaceHolderImages.find(img => img.id === 'villa-map');

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
        toast({ title: "Residents updated successfully." });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Find Your Villa</CardTitle>
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
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
                <p className="text-sm font-medium text-muted-foreground">Residents</p>
                <p className="text-lg font-semibold">{villaDetails.residents || '-'}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-lg font-semibold">{villaDetails.category}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Street</p>
                <p className="text-lg font-semibold">{villaDetails.street}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Block</p>
                <p className="text-lg font-semibold">{villaDetails.block}</p>
            </div>

            {mapPlaceholder && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Location Map</p>
                <div className="rounded-lg overflow-hidden border">
                    <Image
                        src={mapPlaceholder.imageUrl}
                        alt="Villa location map"
                        width={800}
                        height={400}
                        className="w-full h-auto"
                        data-ai-hint={mapPlaceholder.imageHint}
                    />
                </div>
              </div>
            )}
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
                <CardTitle className="font-headline text-lg">Update Residents (Admin)</CardTitle>
                <CardDescription>Update the residents for villa {currentVilla}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input
                    placeholder="Enter residents' names"
                    value={residents}
                    onChange={(e) => setResidents(e.target.value)}
                />
                <Button onClick={handleUpdateResidents} className="w-full">Update Residents</Button>
            </CardContent>
         </Card>
      )}
    </div>
  );
};

export default VillaLocatorTab;

    