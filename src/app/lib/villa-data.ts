import type { Villa, VillaData } from './types';

const DEFAULT_MAP_LINK = "https://www.google.com/maps/d/embed?mid=1CBayu1ggr-NkdhOJhMuFnf24FmJGi44&ehbc=2E312F";

// Helper function to generate a range of villas
const generateVillaRange = (
    prefix: string, 
    start: number, 
    end: number, 
    category: string, 
    street: string, 
    block: string, 
    directions: string
): VillaData => {
    const villas: VillaData = {};
    for (let i = start; i <= end; i++) {
        const villaNumber = `${prefix}-${String(i).padStart(3, '0')}`;
        villas[villaNumber] = {
            category,
            street,
            block,
            residents: directions, 
            mapLink: DEFAULT_MAP_LINK
        };
    }
    return villas;
};

// Data for all villas in Saima Villas
export const villaData: VillaData = {
    ...generateVillaRange("A", 1, 50, "240", "Main Boulevard", "A", "After entering gate, proceed straight on Main Boulevard"),
            
    ...generateVillaRange("B", 352, 366, "160", "Street 1", "A", "After entering gate, take 1st right then 6th right"),
    
    ...generateVillaRange("B", 262, 276, "160", "Street 2", "A", "After entering gate, take 1st right then 5th right - Right Hand Side"),
    ...generateVillaRange("B", 277, 291, "160", "Street 2", "A", "After entering gate, take 1st right then 5th right - Left Hand Side"),
    
    ...generateVillaRange("B", 200, 214, "160", "Street 3", "A", "After entering gate, take 1st right then 4th right - Right Hand Side"),
    ...generateVillaRange("B", 215, 229, "160", "Street 3", "A", "After entering gate, take 1st right then 4th right - Left Hand Side"),
    
    ...generateVillaRange("B", 138, 152, "160", "Street 4", "A", "After entering gate, take 1st right then 3rd right - Right Hand Side"),
    ...generateVillaRange("B", 153, 167, "160", "Street 4", "A", "After entering gate, take 1st right then 3rd right - Left Hand Side"),
    
    ...generateVillaRange("B", 76, 90, "160", "Street 5", "A", "After entering gate, take 1st right then 2nd right - Right Hand Side"),
    ...generateVillaRange("B", 91, 105, "160", "Street 5", "A", "After entering gate, take 1st right then 2nd right - Left Hand Side"),
    
    ...generateVillaRange("A", 87, 99, "240", "Street 6", "A", "After entering gate, take 1st right then 1st right - Right Hand Side"),
    ...generateVillaRange("B", 1, 15, "160", "Street 6", "A", "After entering gate, take 1st right then 1st right - Left Hand Side"),
    
    ...generateVillaRange("B", 16, 30, "160", "Street 7", "A", "After entering gate, take 1st right then 1st left - Right Hand Side"),
    ...generateVillaRange("A", 74, 86, "240", "Street 7", "A", "After entering gate, take 1st right then 1st left - Left Hand Side"),
    
    ...generateVillaRange("B", 106, 113, "160", "Street 8", "A", "After entering gate, take 1st right then 2nd left - Right Hand Side"),
    ...generateVillaRange("B", 61, 75, "160", "Street 8", "A", "After entering gate, take 1st right then 2nd left - Left Hand Side"),
    
    ...generateVillaRange("B", 168, 175, "160", "Street 9", "A", "After entering M9 gate, take 2nd right then 3rd right  - Left Hand Side"),
    ...generateVillaRange("B", 130, 137, "160", "Street 9", "A", "After entering M9 gate, take 2nd right then 3rd right - Right Hand Side"),
    
    ...generateVillaRange("B", 230, 237, "160", "Street 10", "A", "After entering M9 gate, take 2nd right then 4th right  - Left Hand Side"),
    ...generateVillaRange("B", 192, 199, "160", "Street 10", "A", "After entering M9 gate, take 2nd right then 4th right  - Right Hand Side"),
    
    ...generateVillaRange("B", 292, 306, "160", "Street 11", "A", "After entering gate, take 1st right then 3rd left - Right Hand Side"),
    ...generateVillaRange("B", 254, 261, "160", "Street 11", "A", "After entering gate, take 1st right then 3rd left - Left Hand Side"),
    
    ...generateVillaRange("B", 367, 381, "160", "Street 12", "A", "After entering gate, take 1st right then 4th left - Right Hand Side"),
    ...generateVillaRange("B", 337, 351, "160", "Street 12", "A", "After entering gate, take 1st right then 4th left - Left Hand Side"),
    
    ...generateVillaRange("B", 412, 426, "160", "Street 13", "A", "After entering gate, take 1st right then 5th left"),
    
    ...generateVillaRange("B", 397, 411, "160", "Street 14", "A", "After entering gate, take 2nd right then 7th Left"),

    ...generateVillaRange("B", 382, 396, "160", "Street 15", "A", "After entering gate, take 2nd right then 6th Left - Right Hand Side"),
    ...generateVillaRange("B", 322, 336, "160", "Street 15", "A", "After entering gate, take 2nd right then 6th Left - Left Hand Side"),
    
    ...generateVillaRange("B", 307, 321, "160", "Street 16", "A", "After entering gate, take 2nd right then 5th Left - Right Hand Side"),
    ...generateVillaRange("B", 246, 253, "160", "Street 16", "A", "After entering gate, take 2nd right then 5th Left - Left Hand Side"),
    
    ...generateVillaRange("B", 238, 245, "160", "Street 17", "A", "After entering gate, take 2nd right then 4th Left - Right Hand Side"),
    ...generateVillaRange("B", 184, 191, "160", "Street 17", "A", "After entering gate, take 2nd right then 4th Left - Left Hand Side"),
    
    ...generateVillaRange("B", 176, 183, "160", "Street 18", "A", "After entering gate, take 2nd right then 3rd Left - Right Hand Side"),
    ...generateVillaRange("B", 122, 129, "160", "Street 18", "A", "After entering gate, take 2nd right then 3rd Left - Left Hand Side"),

    ...generateVillaRange("B", 114, 121, "160", "Street 19", "A", "After entering gate, take 2nd right then 2nd Left - Right Hand Side"),
    ...generateVillaRange("B", 46, 60, "160", "Street 19", "A", "After entering gate, take 2nd right then 2nd Left - Left Hand Side"),

    ...generateVillaRange("B", 31, 45, "160", "Street 20", "A", "After entering gate, take 2nd right then 1st Left - Right Hand Side"),
    ...generateVillaRange("A", 61, 73, "240", "Street 20", "A", "After entering gate, take 2nd right then 1st Left - Left Hand Side"),

    ...generateVillaRange("R", 1, 9, "120 ONE UNIT", "Street 21", "A", "After entering gate, take 3rd right then 1st Left - Right Hand Side"),
    ...generateVillaRange("A", 51, 60, "240", "Street 21", "A", "After entering gate, take 3rd right then 1st Left - Left Hand Side"),

    ...generateVillaRange("R", 19, 27, "120 ONE UNIT", "Street 22", "A", "After entering gate, take 3rd right then 2nd Left - Right Hand Side"),
    ...generateVillaRange("R", 10, 18, "120 ONE UNIT", "Street 22", "A", "After entering gate, take 3rd right then 2nd Left - Left Hand Side"),

    ...generateVillaRange("R", 37, 45, "120 ONE UNIT", "Street 23", "A", "After entering gate, take 3rd right then 3rd Left - Right Hand Side"),
    ...generateVillaRange("R", 28, 36, "120 ONE UNIT", "Street 23", "A", "After entering gate, take 3rd right then 3rd Left - Left Hand Side"),

    ...generateVillaRange("R", 55, 62, "120 ONE UNIT", "Street 24", "A", "After entering gate, take 3rd right then 4th Left - Right Hand Side"),
    ...generateVillaRange("R", 46, 54, "120 ONE UNIT", "Street 24", "A", "After entering gate, take 3rd right then 4th Left - Left Hand Side"),

    ...generateVillaRange("R", 71, 77, "120 ONE UNIT", "Street 25", "A", "After entering gate, take 3rd right then 5th Left - Right Hand Side"),
    ...generateVillaRange("R", 63, 70, "120 ONE UNIT", "Street 25", "A", "After entering gate, take 3rd right then 5th Left - Left Hand Side"),
    
    ...generateVillaRange("R", 78, 83, "120 ONE UNIT", "Street 26 Masjid Facing", "A", "After entering gate, take 3rd right then 6th Left - Left Hand Side"),

    ...generateVillaRange("R1", 84, 96, "120 Single Story", "Street 27", "B", "Just Right After entering M-10 gate, - Left Hand Side"),

    ...generateVillaRange("R1", 97, 108, "120 Single Story", "Street 28", "B", "Just Right After entering M-10 gate, then 1st Left and 1st Right - Right Hand Side"),
    ...generateVillaRange("R1", 109, 119, "120 Single Story", "Street 28", "B", "Just Right After entering M-10 gate, then 1st Left and 1st Right - Left Hand Side"),

    ...generateVillaRange("R1", 120, 129, "120 Single Story", "Street 29", "B", "Just Right After entering M-10 gate, then 1st Left and 2nd Right - Right Hand Side"),
    ...generateVillaRange("R1", 130, 149, "120 Single Story", "Street 29", "B", "Just Right After entering M-10 gate, then 1st Left and 2nd Right - Left Hand Side"),
    
    ...generateVillaRange("R1", 150, 168, "120 Single Story", "Street 30", "B", "Just Right After entering M-10 gate, then 1st Left and 3rd  Right - Right Hand Side"),
    ...generateVillaRange("R", 169, 186, "120 ONE UNIT", "Street 30", "B", "Just Right After entering M-10 gate, then 1st Left and 3rd  Right - Left Hand Side"),

    ...generateVillaRange("R", 187, 203, "120 ONE UNIT", "Street 31", "B", "Just Right After entering M-10 gate, then 1st Left and 4th  Right - Right Hand Side"),
    ...generateVillaRange("R", 204, 219, "120 ONE UNIT", "Street 31", "B", "Just Right After entering M-10 gate, then 1st Left and 4th  Right - Left Hand Side"),

    ...generateVillaRange("R", 220, 234, "120 ONE UNIT", "Street 32", "B", "After entering M-10 gate, 1st  Right - Right Hand Side"),
    ...generateVillaRange("R", 235, 255, "120 ONE UNIT", "Street 32", "B", "After entering M-10 gate, 1st  Right - Left Hand Side"),

    ...generateVillaRange("R", 256, 276, "120 ONE UNIT", "Street 33", "B", "After entering M-10 gate, 1st  Right 1st Left and Right  - Right Hand Side"),
    ...generateVillaRange("R", 277, 297, "120 ONE UNIT", "Street 33", "B", "After entering M-10 gate, 1st  Right 1st Left and Right - Left Hand Side"),
    
    ...generateVillaRange("R", 298, 318, "120 ONE UNIT", "Street 34", "B", "After entering M-10 gate, 1st  Right 1st Left and 2nd Right  - Right Hand Side"),
    ...generateVillaRange("R", 319, 339, "120 ONE UNIT", "Street 34", "B", "After entering M-10 gate, 1st  Right 1st Left and 2nd Right - Left Hand Side"),

    ...generateVillaRange("R", 340, 360, "120 ONE UNIT", "Street 35", "B", "After entering M-10 gate, 2nd  Right - Right Hand Side"),
    ...generateVillaRange("A1", 15, 28, "240", "Street 35", "B", "After entering M-10 gate, 2nd   Right - Left Hand Side"),

    ...generateVillaRange("A1", 1, 14, "240", "Main Street", "B", "After entering M-9 gate, go straight after round about - Right Hand Side"),

    ...generateVillaRange("R1", 361, 374, "120 Single Story", "Street 36", "B", " After entering M-9 gate, go straight after round about 2nd right – Left Hand Side"),
    
    ...generateVillaRange("R1", 375, 388, "120 Single Story", "Street 37", "B", "After entering M-9 gate, go straight after round about 2nd right then left – right side street"),
    ...generateVillaRange("R1", 389, 401, "120 Single Story", "Street 37", "B", "After entering M-9 gate, go straight after round about 2nd right then left – right side street"),

    ...generateVillaRange("R1", 402, 412, "120 Single Story", "Street 38", "B", "After entering M-9 gate, go straight after round about 2nd right then left – Orange dollar icon on map"),
    
    ...generateVillaRange("R1", 413, 426, "120 Single Story", "Street 39", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - green dollar icon on map"),
    
    ...generateVillaRange("R1", 427, 440, "120 Single Story", "Street 40", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Yellow dollar icon on map"),
    ...generateVillaRange("R1", 441, 453, "120 Single Story", "Street 40", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Yellow dollar icon on map"),

    ...generateVillaRange("R1", 454, 466, "120 Single Story", "Street 41", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Blue dollar icon on map"),
    ...generateVillaRange("R1", 467, 479, "120 Single Story", "Street 41", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Blue dollar icon on map"),

    ...generateVillaRange("R1", 480, 492, "120 Single Story", "Street 42", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Maroon dollar icon on map"),
    
    ...generateVillaRange("R1", 493, 515, "120 Single Story", "Street 43", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight - Brown dollar icon on map"),
    
    ...generateVillaRange("R1", 516, 541, "120 Single Story", "Street 44", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight – Green Camera icon on map"),
    
    ...generateVillaRange("R1", 542, 554, "120 Single Story", "Street 45", "B", "After entering M-9 gate, go straight after round about – 1st right then left go straight – Yellow Camera icon on map"),
    
    ...generateVillaRange("A1", 47, 64, "240", "Street 46", "B", "After entering M-9 gate, go straight after round about  go straight– Maroon Camera icon on map"),
    
    ...generateVillaRange("A1", 29, 46, "240", "Street Main", "B", "After entering M-9 gate, go straight after round about  go straight– Orange Camera icon on map"),
    
    ...generateVillaRange("B1", 526, 545, "160", "Street Main", "B", "After entering M-9 gate, go straight after round about  go straight–  Left Hand Side Villas -- Brown Camera icon on map"),
    
    ...generateVillaRange("B1", 600, 619, "160", "Street 47", "B", "After entering M-9 gate, go straight after round about  take Left then Right– Maroon Camera icon on map"),
    
    ...generateVillaRange("B1", 546, 572, "160", "Street Main", "B", "After entering M-9 gate, go straight after round about  go straight–  Left Hand Side Villas – Maroon ‘P’ icon on map"),
    
    ...generateVillaRange("B1", 573, 599, "160", "Street 48", "B", "After entering M-9 gate, go straight after round about go straight  take 4th Left then Right– Yellow ‘P’ icon on map"),


    "R-193": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Obaid Sadiq",  mapLink: DEFAULT_MAP_LINK },
    "R-194": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Arif Abdullah",  mapLink: DEFAULT_MAP_LINK },
    "R-214": { category: "120 ONE UNIT", street: "Street 31", block: "B", residents: "Mr. Junaid Tanoli",  mapLink: DEFAULT_MAP_LINK },
    "R-354": { category: "120 ONE UNIT", street: "Street 35", block: "B", residents: "Mr. Jawwad Ahmed",  mapLink: DEFAULT_MAP_LINK },
    "R-033": { category: "120 ONE UNIT", street: "Street 23", block: "A", residents: "Mr. Amir Nadeem",  mapLink: DEFAULT_MAP_LINK },
    "R-029": { category: "120 ONE UNIT", street: "Street 23", block: "A", residents: "Mr. Khurram Khan",  mapLink: DEFAULT_MAP_LINK },
    "R-348": { category: "120 ONE UNIT", street: "Street 35", block: "B", residents: "Mr. Saad Baig",  mapLink: DEFAULT_MAP_LINK },
    "R1-390": { category: "120 Single Story", street: "Street 37", block: "B", residents: "Mr. Adnan Ahmed",  mapLink: DEFAULT_MAP_LINK },
    "B-157": { category: "160", street: "Street 4", block: "A", residents: "Mr. Hamid Khan",  mapLink: DEFAULT_MAP_LINK },
    "B-158": { category: "160", street: "Street 4", block: "A", residents: "Mr. Hamid Khan",  mapLink: DEFAULT_MAP_LINK },
    "B-57": { category: "160", street: "Street 19", block: "A", residents: "Mr. Shahid Khan",  mapLink: DEFAULT_MAP_LINK },
    "B-137": { category: "160", street: "Street 9", block: "A", residents: "Mr. Asad Abdullah",  mapLink: DEFAULT_MAP_LINK },
    "B-301": { category: "160", street: "Street 11", block: "A", residents: "Mr. Asif Merchant",  mapLink: DEFAULT_MAP_LINK },
    "B-108": { category: "160", street: "Street 8", block: "A", residents: "Mr. Muhammad Faisal",  mapLink: DEFAULT_MAP_LINK },
    "A-001": { "category": "160", "street": "1", "block": "A", "residents": "", "mapLink": "https://maps.google.com/maps?q=24.968056,67.0625" },
    "A-002": { "category": "160", "street": "1", "block": "A", "residents": "", "mapLink": "https://maps.google.com/maps?q=24.968056,67.0625" },
    "B-100": { "category": "240", "street": "5", "block": "B", "residents": "", "mapLink": "https://maps.google.com/maps?q=24.970556,67.065" },
    "B-252": { "category": "240", "street": "10", "block": "B", "residents": "", "mapLink": "https://maps.google.com/maps?q=24.972222,67.066111" }
};
