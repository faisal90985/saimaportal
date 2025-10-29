"use client";

import { useState } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';
import VillaLocatorTab from '@/components/tabs/villa-locator-tab';
import AdvertisementsTab from '@/components/tabs/advertisements-tab';
import ManagementTab from '@/components/tabs/management-tab';
import ComplaintsTab from '@/components/tabs/complaints-tab';
import EmergencyTab from '@/components/tabs/emergency-tab';
import AdminTab from '@/components/tabs/admin-tab';
import MasjidModal from '@/components/modals/masjid-modal';
import SaimaMartModal from '@/components/modals/saima-mart-modal';
import { Button } from '@/components/ui/button';
import { MosqueIcon, StoreIcon } from '@/components/icons';
import type { Tab } from '@/app/lib/types';
import { approvedPhones as initialApprovedPhones, managementPassword as initialManagementPassword } from '@/app/lib/data';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('villa-locator');
  const [showMasjidModal, setShowMasjidModal] = useState(false);
  const [showSaimaMartModal, setShowSaimaMartModal] = useState(false);
  const [isMartOpen, setIsMartOpen] = useState(false);

  // Authentication and data states that would typically come from a context or backend
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isManagementLoggedIn, setIsManagementLoggedIn] = useState(false);
  const [approvedPhones, setApprovedPhones] = useState(initialApprovedPhones);
  const [managementPassword, setManagementPassword] = useState(initialManagementPassword);

  const authProps = {
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    isManagementLoggedIn,
    setIsManagementLoggedIn,
    approvedPhones,
    setApprovedPhones,
    managementPassword,
    setManagementPassword,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'villa-locator':
        return <VillaLocatorTab {...authProps} />;
      case 'advertisements':
        return <AdvertisementsTab {...authProps} />;
      case 'management':
        return <ManagementTab {...authProps} />;
      case 'complaints':
        return <ComplaintsTab {...authProps} />;
      case 'emergency':
        return <EmergencyTab {...authProps} />;
      case 'admin':
        return <AdminTab {...authProps} />;
      default:
        return <VillaLocatorTab {...authProps} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-4 pb-28 md:pb-8 w-full max-w-4xl">
        {renderTabContent()}
      </main>
      
      <div className="fixed top-24 right-5 z-50 flex flex-col gap-4">
        <Button 
          size="icon"
          aria-label="Saima Mart Status"
          onClick={() => setShowSaimaMartModal(true)}
          className="rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          <StoreIcon className="w-7 h-7" />
        </Button>
        <Button 
          size="icon"
          aria-label="Masjid Timings"
          onClick={() => setShowMasjidModal(true)}
          className="rounded-full w-14 h-14 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          <MosqueIcon className="w-7 h-7" />
        </Button>
      </div>

      <MasjidModal isOpen={showMasjidModal} onOpenChange={setShowMasjidModal} {...authProps} />
      <SaimaMartModal 
        isOpen={showSaimaMartModal} 
        onOpenChange={setShowSaimaMartModal}
        isMartOpen={isMartOpen}
        setIsMartOpen={setIsMartOpen}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
