// Server information TypeScript interface
export interface ServerInfo {
  name: string;
  ip: string;
  port: string;
  queryIp: string;
  queryPort: number;
  version: string;
  gameMode: string;
  online: boolean;
  playerCount: number;
  maxPlayers: number;
  uptime: string;
  description: string;
  features: string[];
}

// Server information data
export const serverInfo: ServerInfo = {
  name: "KBB",
  ip: "mc.kbblet.cn",
  port: "25565",
  queryIp: "play.simpfun.cn",
  queryPort: 23813,
  version: "1.21.4",
  gameMode: "Survival with Creative Mode for staff",
  online: true,
  playerCount: 0,
  maxPlayers: 50,
  uptime: "0d 0h 0m",
  description: "A friendly Minecraft server with custom features, active community, and regular events. Join us today and build your dreams!",
  features: [
    "Custom plugins and gameplay",
    "Regular community events",
    "Friendly and active staff",
    "No pay-to-win elements",
    "Player-driven economy",
    "Anti-griefing protection"
  ]
};


// Server status mock data with timestamps
export const serverStatusHistory = [
  { time: "00:00", players: 12 },
  { time: "04:00", players: 5 },
  { time: "08:00", players: 8 },
  { time: "12:00", players: 21 },
  { time: "16:00", players: 35 },
  { time: "20:00", players: 42 },
  { time: "Now", players: 24 }
];