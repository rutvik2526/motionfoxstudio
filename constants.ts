import { Game } from './types';

export const STUDIO_NAME = "Motion Fox Studio";
export const FOUNDER_NAME = "Laksh Dhanani";
export const STUDIO_LOGO_URL = "https://i.ibb.co/CpBtVnV6/Motion-Fox-Studio-Icon-small.png";

// Helper to generate direct Roblox asset URLs
// We use rbxthumb as it is often more reliable for direct hotlinking than asset-thumbnail
const getThumb = (placeId: number) => `https://tr.rbxcdn.com/${placeId}/768/432/Image/Png`; 
const getIcon = (placeId: number) => `https://tr.rbxcdn.com/${placeId}/150/150/Image/Png`;

export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    masterId: 5099494745,
    placeId: 14796733016,
    title: 'Candy Land Obby',
    description: 'Explore a vibrant, sugary world filled with challenging obstacles and sweet rewards. Can you reach the end of the candy rainbow?',
    thumbnailUrl: 'https://placehold.co/768x432/orange/white?text=Candy+Land+Loading...',
    iconUrl: 'https://placehold.co/150x150/orange/white?text=...',
    playUrl: 'https://www.roblox.com/games/14796733016/UPDATE-Candy-Land-Obby',
    tags: ['Obby', 'Adventure', 'Family'],
    isFeatured: true,
  },
  {
    id: '2',
    masterId: 8555609933,
    placeId: 137821301447536,
    title: 'Hide n Slash',
    description: 'A high-stakes game of cat and mouse. Hiders must blend in and survive, while the Slasher hunts them down using unique abilities.',
    thumbnailUrl: 'https://placehold.co/768x432/black/white?text=Hide+n+Slash+Loading...',
    iconUrl: 'https://placehold.co/150x150/black/white?text=...',
    playUrl: 'https://www.roblox.com/games/137821301447536/Hide-n-Slash',
    tags: ['Horror', 'Survival', 'PvP'],
    isFeatured: true,
  },
  {
    id: '3',
    masterId: 7822380363,
    placeId: 89038890746934,
    title: 'Slackers Company',
    description: 'Work is for losers! Master the art of doing absolutely nothing while avoiding the boss in this hilarious workplace simulator.',
    thumbnailUrl: 'https://placehold.co/768x432/blue/white?text=Slackers+Loading...',
    iconUrl: 'https://placehold.co/150x150/blue/white?text=...',
    playUrl: 'https://www.roblox.com/games/89038890746934/NEW-Slackers-Company',
    tags: ['Simulator', 'Comedy', 'Roleplay'],
    isFeatured: true,
  },
  {
    id: '4',
    masterId: 5305947005,
    placeId: 15381090708,
    title: 'Dream Life RP',
    description: 'Build your legacy in a sprawling city. Adopt pets, buy luxury penthouses, and roleplay your dream career with friends.',
    thumbnailUrl: 'https://placehold.co/768x432/pink/white?text=Dream+Life+Loading...',
    iconUrl: 'https://placehold.co/150x150/pink/white?text=...',
    playUrl: 'https://www.roblox.com/games/15381090708/Dream-Life-RP',
    tags: ['Roleplay', 'Town & City', 'Social'],
    isFeatured: true,
  },
  {
    id: '5',
    masterId: 6729783553,
    placeId: 130733446787074,
    title: 'Destroy and Drive Spaceships',
    description: 'Command massive intergalactic cruisers and engage in explosive battles with advanced destruction physics. Blast enemy ships into debris!',
    thumbnailUrl: 'https://placehold.co/768x432/gray/white?text=Spaceships+Loading...',
    iconUrl: 'https://placehold.co/150x150/gray/white?text=...',
    playUrl: 'https://www.roblox.com/games/130733446787074/Destroy-and-Drive-Spaceships',
    tags: ['Sci-Fi', 'Vehicle', 'Destruction'],
    isFeatured: false,
  },
  {
    id: '6',
    masterId: 4612090657,
    placeId: 13225153258,
    title: 'Sink Ships and Boats',
    description: 'Survive catastrophic maritime disasters or captain the vessel. Realistic water physics make every sinking unique.',
    thumbnailUrl: 'https://placehold.co/768x432/teal/white?text=Sink+Ships+Loading...',
    iconUrl: 'https://placehold.co/150x150/teal/white?text=...',
    playUrl: 'https://www.roblox.com/games/13225153258/Sink-Ships-and-Boats',
    tags: ['Simulation', 'Physics', 'Disaster'],
    isFeatured: false,
  },
  {
    id: '7',
    masterId: 4612092255,
    placeId: 13225157345,
    title: 'Realistic Sail and Sink Ships',
    description: 'The ultimate naval simulation. Navigate treacherous waters with realistic sailing mechanics and dynamic weather systems.',
    thumbnailUrl: 'https://placehold.co/768x432/cyan/white?text=Sailing+Loading...',
    iconUrl: 'https://placehold.co/150x150/cyan/white?text=...',
    playUrl: 'https://www.roblox.com/games/13225157345/Realistic-Sail-and-Sink-Ships',
    tags: ['Simulation', 'Naval', 'Realistic'],
    isFeatured: false,
  },
  {
    id: '8',
    masterId: 7631072285,
    placeId: 113627622022152,
    title: 'Wish Master',
    description: 'Explore a magical realm where your wishes have consequences. Embark on epic quests and battle mythical creatures.',
    thumbnailUrl: 'https://placehold.co/768x432/purple/white?text=Wish+Master+Loading...',
    iconUrl: 'https://placehold.co/150x150/purple/white?text=...',
    playUrl: 'https://www.roblox.com/games/113627622022152/Wish-Master',
    tags: ['RPG', 'Fantasy', 'Adventure'],
    isFeatured: false,
  },
];