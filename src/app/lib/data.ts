import type { VillaData, Ad, Complaint, ManagementPost, EmergencyContact, NamazTimings, PostType } from './types';

const DEFAULT_MAP_LINK = "https://www.google.com/maps/d/embed?mid=1CBayu1ggr-NkdhOJhMuFnf24FmJGi44&ehbc=2E312F";

function generateVillaRange(block: string, start: number, end: number, category: string, street: string, blockLetter: string) {
    const villas: VillaData = {};
    for (let i = start; i <= end; i++) {
        const villaNumber = `${block}-${i.toString().padStart(3, '0')}`;
        villas[villaNumber] = {
            category: category,
            street: street,
            block: blockLetter,
            residents: "", // Empty by default
            mapLink: DEFAULT_MAP_LINK
        };
    }
    return villas;
}

export const villaData: VillaData = {
    ...generateVillaRange("A", 1, 50, "240", "Main Boulevard", "A"),
    ...generateVillaRange("B", 352, 366, "160", "Street 1", "A"),
    ...generateVillaRange("B", 262, 291, "160", "Street 2", "A"),
    ...generateVillaRange("B", 200, 229, "160", "Street 3", "A"),
    ...generateVillaRange("B", 138, 167, "160", "Street 4", "A"),
    ...generateVillaRange("B", 76, 105, "160", "Street 5", "A"),
    ...generateVillaRange("A", 87, 99, "240", "Street 6", "A"),
    ...generateVillaRange("B", 1, 15, "160", "Street 6", "A"),
    ...generateVillaRange("B", 16, 30, "160", "Street 7", "A"),
    ...generateVillaRange("A", 74, 86, "240", "Street 7", "A"),
    ...generateVillaRange("B", 106, 113, "160", "Street 8", "A"),
    ...generateVillaRange("B", 61, 75, "160", "Street 8", "A"),
    ...generateVillaRange("B", 168, 175, "160", "Street 9", "A"),
    ...generateVillaRange("B", 130, 137, "160", "Street 9", "A"),
    ...generateVillaRange("B", 230, 237, "160", "Street 10", "A"),
    ...generateVillaRange("B", 192, 199, "160", "Street 10", "A"),
    ...generateVillaRange("B", 292, 306, "160", "Street 11", "A"),
    ...generateVillaRange("B", 254, 261, "160", "Street 11", "A"),
    ...generateVillaRange("B", 367, 381, "160", "Street 12", "A"),
    ...generateVillaRange("B", 337, 351, "160", "Street 12", "A"),
    ...generateVillaRange("B", 412, 426, "160", "Street 13", "A"),
    ...generateVillaRange("B", 397, 411, "160", "Street 14", "A"),
    ...generateVillaRange("B", 382, 396, "160", "Street 15", "A"),
    ...generateVillaRange("B", 322, 336, "160", "Street 15", "A"),
    ...generateVillaRange("B", 307, 321, "160", "Street 16", "A"),
    ...generateVillaRange("B", 246, 253, "160", "Street 16", "A"),
    ...generateVillaRange("B", 238, 245, "160", "Street 17", "A"),
    ...generateVillaRange("B", 184, 191, "160", "Street 17", "A"),
    ...generateVillaRange("B", 176, 183, "160", "Street 18", "A"),
    ...generateVillaRange("B", 122, 129, "160", "Street 18", "A"),
    ...generateVillaRange("B", 114, 121, "160", "Street 19", "A"),
    ...generateVillaRange("B", 46, 60, "160", "Street 19", "A"),
    ...generateVillaRange("B", 31, 45, "160", "Street 20", "A"),
    ...generateVillaRange("A", 61, 73, "240", "Street 20", "A"),
    ...generateVillaRange("R", 1, 9, "120 ONE UNIT", "Street 21", "A"),
    ...generateVillaRange("A", 51, 60, "240", "Street 21", "A"),
    ...generateVillaRange("R", 19, 27, "120 ONE UNIT", "Street 22", "A"),
    ...generateVillaRange("R", 10, 18, "120 ONE UNIT", "Street 22", "A"),
    ...generateVillaRange("R", 37, 45, "120 ONE UNIT", "Street 23", "A"),
    ...generateVillaRange("R", 28, 36, "120 ONE UNIT", "Street 23", "A"),
    ...generateVillaRange("R", 55, 62, "120 ONE UNIT", "Street 24", "A"),
    ...generateVillaRange("R", 46, 54, "120 ONE UNIT", "Street 24", "A"),
    ...generateVillaRange("R", 71, 77, "120 ONE UNIT", "Street 25", "A"),
    ...generateVillaRange("R", 63, 70, "120 ONE UNIT", "Street 25", "A"),
    ...generateVillaRange("R", 78, 83, "120 ONE UNIT", "Street 26", "A"),
    ...generateVillaRange("R1", 84, 96, "120 Single Story", "Street 27", "B"),
    ...generateVillaRange("R1", 97, 119, "120 Single Story", "Street 28", "B"),
    ...generateVillaRange("R1", 120, 149, "120 Single Story", "Street 29", "B"),
    ...generateVillaRange("R1", 150, 168, "120 Single Story", "Street 30", "B"),
    ...generateVillaRange("R", 169, 186, "120 ONE UNIT", "Street 30", "B"),
    ...generateVillaRange("R", 187, 219, "120 ONE UNIT", "Street 31", "B"),
    ...generateVillaRange("R", 220, 255, "120 ONE UNIT", "Street 32", "B"),
    ...generateVillaRange("R", 256, 297, "120 ONE UNIT", "Street 33", "B"),
    ...generateVillaRange("R", 298, 339, "120 ONE UNIT", "Street 34", "B"),
    ...generateVillaRange("R", 340, 360, "120 ONE UNIT", "Street 35", "B"),
    ...generateVillaRange("A1", 15, 28, "240", "Street 35", "B"),
    ...generateVillaRange("A1", 1, 14, "240", "Main Street", "B"),
    ...generateVillaRange("R1", 361, 374, "120 Single Story", "Street 36", "B"),
    ...generateVillaRange("R1", 375, 401, "120 Single Story", "Street 37", "B"),
    ...generateVillaRange("R1", 402, 412, "120 Single Story", "Street 38", "B"),
    ...generateVillaRange("R1", 413, 426, "120 Single Story", "Street 39", "B"),
    ...generateVillaRange("R1", 427, 453, "120 Single Story", "Street 40", "B"),
    ...generateVillaRange("R1", 454, 479, "120 Single Story", "Street 41", "B"),
    ...generateVillaRange("R1", 480, 492, "120 Single Story", "Street 42", "B"),
    ...generateVillaRange("R1", 493, 515, "120 Single Story", "Street 43", "B"),
    ...generateVillaRange("R1", 516, 541, "120 Single Story", "Street 44", "B"),
    ...generateVillaRange("R1", 542, 554, "120 Single Story", "Street 45", "B"),
    ...generateVillaRange("A1", 47, 64, "240", "Street 46", "B"),
    ...generateVillaRange("A1", 29, 46, "240", "Street Main", "B"),
    ...generateVillaRange("B", 526, 545, "160", "Street Main", "B"),
    ...generateVillaRange("B", 600, 619, "160", "Street 47", "B"),
    ...generateVillaRange("B", 546, 572, "160", "Street Main", "B"),
    ...generateVillaRange("B", 573, 599, "160", "Street 48", "B"),
    "R-193": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Obaid Sadiq", mapLink: DEFAULT_MAP_LINK },
    "R-194": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Arif Abdullah", mapLink: DEFAULT_MAP_LINK },
    "R-214": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Junaid Tanoli", mapLink: DEFAULT_MAP_LINK },
    "R-354": { category: "120 ONE UNIT", street: "Street 35", block: "B", residents: "Mr. Jawwad Ahmed", mapLink: DEFAULT_MAP_LINK },
    "R-033": { category: "120 ONE UNIT", street: "Street 23", block: "A", residents: "Mr. Amir Nadeem", mapLink: DEFAULT_MAP_LINK },
    "R-029": { category: "120 ONE UNIT", street: "Street 23", block: "A", residents: "Mr. Khurram Khan", mapLink: DEFAULT_MAP_LINK },
    "R-348": { category: "120 ONE UNIT", street: "Street 35", block: "B", residents: "Mr. Saad Baig", mapLink: DEFAULT_MAP_LINK },
    "R1-390": { category: "120 Single Story", street: "Street 37", block: "B", residents: "Mr. Adnan Ahmed", mapLink: DEFAULT_MAP_LINK },
    "B-157": { category: "160", street: "Street 4", block: "A", residents: "Mr. Hamid Khan", mapLink: DEFAULT_MAP_LINK },
    "B-158": { category: "160", street: "Street 4", block: "A", residents: "Mr. Hamid Khan", mapLink: DEFAULT_MAP_LINK },
    "B-057": { category: "160", street: "Street 19", block: "A", residents: "Mr. Shahid Khan", mapLink: DEFAULT_MAP_LINK },
    "B-137": { category: "160", street: "Street 9", block: "A", residents: "Mr. Asad Abdullah", mapLink: DEFAULT_MAP_LINK },
    "B-301": { category: "160", street: "Street 11", block: "A", residents: "Mr. Asif Merchant", mapLink: DEFAULT_MAP_LINK },
    "B-108": { category: "160", street: "Street 8", block: "A", residents: "Mr. Muhammad Faisal", mapLink: DEFAULT_MAP_LINK },
};

export const AD_EXPIRY_HOURS = 24;

export let advertisements: Ad[] = [
    { id: '1', category: 'Car Pooling', title: 'To I.I. Chundrigar Road', description: 'Daily trip to office, 2 seats available.', phone: '0300-1112233', expiry: Date.now() + 12 * 3600 * 1000, poolArea: 'I.I. Chundrigar', poolCar: 'Suzuki Alto', poolCharges: '150', poolSeats: '2', poolTime: '08:30' },
    { id: '2', category: 'Property', title: 'Villa for Rent', description: 'Corner villa available for rent in Block A.', phone: '0321-4455667', expiry: Date.now() + 48 * 3600 * 1000 },
];

export let complaints: Complaint[] = [
    { id: '1', villa: 'A-021', title: 'Street light not working', description: 'The light outside my house is flickering.', timestamp: Date.now() - 3 * 24 * 3600 * 1000, noted: true, resolved: false },
    { id: '2', villa: 'B-158', title: 'Water leakage', description: 'There is a water supply line leakage on the street.', timestamp: Date.now() - 1 * 24 * 3600 * 1000, noted: true, resolved: true, resolvedDate: Date.now() },
];

export let managementPosts: ManagementPost[] = [
    { id: '1', type: 'Announcement', title: 'Monthly Maintenance Charges', content: 'Please pay your monthly maintenance charges by the 5th of this month to avoid late fees.', timestamp: Date.now() - 7 * 24 * 3600 * 1000 },
];

export const emergencyContacts: EmergencyContact[] = [
    { id: 'sec', type: "Security", name: "Community Security", phone: "021-35874092", description: "24/7 security helpline" },
    { id: 'amb', type: "Ambulance", name: "Emergency Ambulance", phone: "1122", description: "Emergency medical service" },
    { id: 'fire', type: "Fire Brigade", name: "Fire Emergency", phone: "16", description: "Fire emergency service" },
    { id: 'pol', type: "Police", name: "Police Helpline", phone: "15", description: "Police emergency" },
    { id: 'plumb', type: "Plumber", name: "Ali Ahmed", phone: "0300-1234567", description: "24/7 service, reasonable rates" },
    { id: 'elec', type: "Electrician", name: "Hassan Khan", phone: "0312-7654321", description: "Expert in all electrical work" },
    { id: 'maid', type: "Maid", name: "Fatima Bibi", phone: "0333-9876543", description: "Cleaning and household work" },
    { id: 'carp', type: "Carpenter", name: "Rashid Ali", phone: "0345-1122334", description: "Furniture repair and custom work" },
    { id: 'paint', type: "Painter", name: "Kamran Malik", phone: "0321-5566778", description: "Interior and exterior painting" },
    { id: 'ac', type: "AC Repair", name: "Shahid Mehmood", phone: "0301-9988776", description: "AC installation and repair" },
];

export const adminPassword = "423060Saima";
export let managementPassword = "password123";
export let approvedPhones = ["03001234567", "03219876543"];

export let namazTimings: NamazTimings = {
    fajr: '06:10',
    zuhar: '13:30',
    asar: '16:45',
    maghrib: '18:00',
    isha: '20:00',
    jumma: '13:15',
    imam: 'janab zulfiqar sahab',
    moazin: 'janab salman sahab',
    khadim: 'janab khalil sahab'
};

export const postTypes: PostType[] = ["Announcement", "Duty Timings", "Maintenance", "Future Plans", "Progress Update", "SOPs"];

    
