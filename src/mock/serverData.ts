/**
 * 服务器信息接口定义
 * 描述服务器的基本信息和状态
 */
export interface ServerInfo {
  /** 服务器名称 */
  name: string;
  /** 服务器IP地址 */
  ip: string;
  /** 服务器端口 */
  port: string;
  /** 查询IP地址 */
  queryIp: string;
  /** 查询端口 */
  queryPort: number;
  /** 服务器版本 */
  version: string;
  /** 服务器是否在线 */
  online: boolean;
  /** 当前在线玩家数量 */
  playerCount: number;
  /** 最大玩家数量限制 */
  maxPlayers: number;
  /** 服务器运行时间 */
  uptime: string;
  /** 服务器描述 */
  description: string;
  /** 服务器特色功能列表 */
  features: string[];
}

/**
 * 服务器信息数据
 * 包含服务器的基本配置和当前状态
 */
export const serverInfo: ServerInfo = {
  name: "KBB",
  ip: "mc.kbblet.cn",
  port: "25565",
  queryIp: "play.simpfun.cn",
  queryPort: 23813,
  version: "1.21.4",
  online: false,  // 当前服务器状态：离线
  playerCount: 0,  // 当前在线人数
  maxPlayers: 50,  // 最大在线人数限制
  uptime: "0d 0h 0m",  // 服务器运行时间
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