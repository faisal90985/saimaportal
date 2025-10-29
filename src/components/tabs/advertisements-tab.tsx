"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adCategories, type AdCategory, type AuthProps, type Ad } from '@/app/lib/types';
import { advertisements as initialAds } from '@/app/lib/data';
import AdFormDialog from '@/components/modals/ad-form-dialog';
import PhoneVerifyDialog from '@/components/modals/phone-verify-dialog';
import AdCard from '@/components/ad-card';
import { PlusCircle, Megaphone } from 'lucide-react';

const AdvertisementsTab = ({ approvedPhones, isAdminLoggedIn, isManagementLoggedIn }: AuthProps) => {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<AdCategory | 'All Ads'>('All Ads');
  const [dialog, setDialog] = useState<'verify' | 'form' | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  
  useEffect(() => {
    const now = Date.now();
    const activeAds = ads.filter(ad => ad.expiry > now);
    if (selectedCategory === 'All Ads') {
      setFilteredAds(activeAds.sort((a, b) => b.expiry - a.expiry));
    } else {
      setFilteredAds(activeAds.filter(ad => ad.category === selectedCategory).sort((a, b) => b.expiry - a.expiry));
    }
  }, [ads, selectedCategory]);

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
    if (editingAd) {
      setAds(ads.map(ad => ad.id === newAd.id ? newAd : ad));
    } else {
      setAds([...ads, newAd]);
    }
    setDialog(null);
    setEditingAd(null);
    setVerifiedPhone(null);
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };
  
  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad);
    if (isAdminLoggedIn || isManagementLoggedIn) {
        setVerifiedPhone(ad.phone);
        setDialog('form');
    } else {
        // For regular users, verification is handled inside AdCard
        // This direct call to form is for when verification inside card succeeds
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
            {filteredAds.length > 0 ? (
              filteredAds.map(ad => (
                <AdCard 
                  key={ad.id} 
                  ad={ad} 
                  onEdit={handleEditAd} 
                  onDelete={handleDeleteAd}
                  isAdmin={isAdminLoggedIn || isManagementLoggedIn}
                  approvedPhones={approvedPhones}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-10">
                <Megaphone className="mx-auto h-12 w-12" />
                <p className="mt-4">No advertisements in this category.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <PhoneVerifyDialog
        isOpen={dialog === 'verify'}
        onOpenChange={(open) => !open && handleDialogClose()}
        approvedPhones={approvedPhones}
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
