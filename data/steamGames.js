// Steam game notifications data
export const steamNotifications = [
  {
    id: 1,
    appId: 1326470,
    name: "DRAGON BALL: Sparking! ZERO",
    genre: "Action",
    type: "GAME",
    status: "Added",
    bgColor: "from-blue-900/95 to-purple-900/95",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-200",
    iconBg: "from-green-400 to-blue-500",
    iconUrl: `https://cdn.akamai.steamstatic.com/steam/apps/1790600/library_600x900.jpg`
  },
  {
    id: 2,
    appId: 1091500,
    name: "Cyberpunk 2077",
    genre: "RPG",
    type: "DLC",
    status: "New DLC available",
    bgColor: "from-green-900/95 to-teal-900/95",
    borderColor: "border-green-500/30",
    textColor: "text-green-200",
    iconBg: "from-orange-400 to-red-500",
    iconUrl: `https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_600x900.jpg`
  },
  {
    id: 3,
    appId: 1086940,
    name: "Baldur's Gate 3",
    genre: "RPG",
    type: "Added",
    status: "Friend started playing",
    bgColor: "from-purple-900/95 to-pink-900/95",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-200",
    iconBg: "from-yellow-400 to-orange-500",
    iconUrl: `https://cdn.akamai.steamstatic.com/steam/apps/1086940/library_600x900.jpg`
  },
  {
    id: 4,
    appId: 1245620,
    name: "Elden Ring",
    genre: "Action RPG",
    type: "SALE",
    status: "Added",
    bgColor: "from-red-900/95 to-orange-900/95",
    borderColor: "border-red-500/30",
    textColor: "text-red-200",
    iconBg: "from-blue-400 to-purple-500",
    iconUrl: `https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_600x900.jpg`
  }
];

// Function to get random notifications
export const getRandomNotifications = (count = 4) => {
  const shuffled = [...steamNotifications].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Steam API helper (for future implementation)
export const fetchSteamGameData = async (appId) => {
  try {
    // Note: Steam API has CORS issues, you'll need a proxy or backend
    const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    const data = await response.json();
    return data[appId]?.data;
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return null;
  }
};
