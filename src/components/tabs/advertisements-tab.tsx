"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adCategories, type AdCategory, type AuthProps, type Ad } from '@/app/lib/types';
import AdFormDialog from '@/components/modals/ad-form-dialog';
import PhoneVerifyDialog from '@/components/modals/phone-verify-dialog';
import AdCard from '@/components/ad-card';
import { PlusCircle, Megaphone } from 'lucide-react';
import { useFirestore, useCollection, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';

const AdvertisementsTab = ({ isAdminLoggedIn, isManagementLoggedIn }: AuthProps) => {
  const firestore = useFirestore();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<AdCategory | 'All Ads'>('All Ads');
  const [dialog, setDialog] = useState<'verify' | 'form' | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  
  const adsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const adsRef = collection(firestore, 'advertisements');
    if (selectedCategory === 'All Ads') {
        return query(adsRef, where('expiry', '>', Date.now()), orderBy('expiry', 'desc'));
    }
    return query(adsRef, where('category', '==', selectedCategory), where('expiry', '>', Date.now()), orderBy('expiry', 'desc'));
  }, [firestore, selectedCategory]);

  const { data: ads, isLoading } = useCollection<Ad>(adsQuery);

  const handlePostAdClick = () => {
    setEditingAd(null);
    if (isAdminLoggedIn || isManagementLoggedIn) {
        setVerifiedPhone('admin'); // Use a placeholder for admin/mgmt
        setDialog('form');
    } else {
        setDialog('verify');
    }
  };

  const handleVerifySuccess = (phone: string) => {
    setVerifiedPhone(phone);
    setDialog('form');
  };

  const handleSaveAd = (newAd: Ad) => {
    if (!firestore) return;
    if (editingAd) {
      const adRef = doc(firestore, 'advertisements', newAd.id);
      setDocumentNonBlocking(adRef, newAd, { merge: true });
    } else {
      const adsRef = collection(firestore, 'advertisements');
      addDocumentNonBlocking(adsRef, newAd);
    }
    setDialog(null);
    setEditingAd(null);
    setVerifiedPhone(null);
  };

  const handleDeleteAd = (id: string) => {
    if (!firestore) return;
    const adRef = doc(firestore, 'advertisements', id);
    deleteDocumentNonBlocking(adRef);
  };
  
  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad);
    if (isAdminLoggedIn || isManagementLoggedIn) {
        setVerifiedPhone(ad.phone);
        setDialog('form');
    } else {
        setVerifiedPhone(ad.phone);
        setDialog('form');
    }
  };
  
  const handleDialogClose = () => {
    setDialog(null);
    setEditingAd(null);
    setVerifiedPhone(null);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-headline">Community Ads</CardTitle>
          <Button size="sm" onClick={handlePostAdClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post Ad
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
             <Button
                variant={selectedCategory === 'All Ads' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('All Ads')}
              >
                All Ads
              </Button>
            {adCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {isLoading && <p>Loading ads...</p>}
            {!isLoading && ads && ads.length > 0 ? (
              ads.map(ad => (
                <AdCard 
                  key={ad.id} 
                  ad={ad} 
                  onEdit={handleEditAd} 
                  onDelete={handleDeleteAd}
                  isAdmin={isAdminLoggedIn || isManagementLoggedIn}
                  approvedPhones={[]} // This should be replaced with logic for approved phones
                />
              ))
            ) : (
             !isLoading && (
              <div className="col-span-full text-center text-muted-foreground py-10">
                <Megaphone className="mx-auto h-12 w-12" />
                <p className="mt-4">No advertisements in this category.</p>
              </div>
             )
            )}
          </div>
        </CardContent>
      </Card>

      <PhoneVerifyDialog
        isOpen={dialog === 'verify'}
        onOpenChange={(open) => !open && handleDialogClose()}
        onVerifySuccess={handleVerifySuccess}
        editingAd={editingAd}
        purpose="post an ad"
      />
      
      <AdFormDialog
        isOpen={dialog === 'form'}
        onOpenChange={(open) => !open && handleDialogClose()}
        onSave={handleSaveAd}
        phone={verifiedPhone}
        adToEdit={editingAd}
      />
    </div>
  );
};

export default AdvertisementsTab;
