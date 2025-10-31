export type Tab = 'villa-locator' | 'advertisements' | 'management' | 'complaints' | 'emergency' | 'admin';

export interface Villa {
  id?: string;
  category: string;
  street: string;
  block: string;
  residents: string;
  mapLink: string;
}

export interface VillaData {
  [key: string]: Villa;
}

export interface Ad {
  id: string;
  category: AdCategory;
  title: string;
  description:string;
  phone: string;
  expiry: number;
  // Car Pooling specific
  poolTime?: string;
  poolSeats?: string;
  poolArea?: string;
  poolCharges?: string;
  poolCar?: string;
}

export type AdCategory = "Property" | "Food" | "Ladies Items" | "Tution Center" | "Missing Goods" | "Health & Medicine" | "Car Pooling" | "Others" | "All Ads";

export const adCategories: AdCategory[] = ["Property", "Food", "Ladies Items", "Tution Center", "Missing Goods", "Health & Medicine", "Car Pooling", "Others"];


export interface Complaint {
  id: string;
  villa: string;
  title: string;
  description: string;
  timestamp: number;
  noted: boolean;
  resolved: boolean;
  resolvedDate?: number;
}

export interface ManagementPost {
  id: string;
  type: PostType;
  title: string;
  content: string;
  timestamp: number;
}

export type PostType = "Announcement" | "Duty Timings" | "Maintenance" | "Future Plans" | "Progress Update" | "SOPs";
export const postTypes: PostType[] = ["Announcement", "Duty Timings", "Maintenance", "Future Plans", "Progress Update", "SOPs"];


export interface EmergencyContact {
  id: string;
  type: ContactType;
  name: string;
  phone: string;
  description: string;
}

export type ContactType = "Plumber" | "Electrician" | "Maid" | "Carpenter" | "Painter" | "AC Repair" | "Security" | "Ambulance" | "Fire Brigade" | "Police" | "Other";
export const contactTypes: ContactType[] = ["Plumber", "Electrician", "Maid", "Carpenter", "Painter", "AC Repair", "Other"];

export interface NamazTimings {
  fajr: string;
  zuhar: string;
  asar: string;
  maghrib: string;
  isha: string;
  jumma: string;
  imam: string;
  moazin: string;
  khadim: string;
}

export type MartStatus = "Open" | "Closed" | "Namaz Break" | "Lunch/Dinner Time";
export const martStatuses: MartStatus[] = ["Open", "Closed", "Namaz Break", "Lunch/Dinner Time"];


export interface AuthProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (value: boolean) => void;
  isManagementLoggedIn: boolean;
  setIsManagementLoggedIn: (value: boolean) => void;
  isMartOwnerLoggedIn: boolean;
  setIsMartOwnerLoggedIn: (value: boolean) => void;
}
    
