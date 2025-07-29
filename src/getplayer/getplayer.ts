/**
 * KBB 服务器数据获取工具
 * 用于从 API 获取服务器状态和在线人数信息
 */

/**
 * 服务器状态数据接口
 */
export interface ServerStatusData {
  /** 当前在线人数 */
  p: number;
  /** 最大在线人数 */
  mp: number;
  /** 服务器状态 */
  status?: string;
  /** 服务器延迟 */
  ping?: number;
  /** 服务器版本 */
  version?: string;
}

/**
 * 获取 KBB 服务器数据
 * @returns Promise<ServerStatusData> 服务器状态数据
 */
export async function fetchKbbletData(): Promise<ServerStatusData> {
  try {
    const response = await fetch('https://list.mczfw.cn/api/mc.kbblet.cn');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ServerStatusData = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch KBB server data:', error);
    // 返回默认值，表示服务器离线
    return {
      p: 0,
      mp: 50,
      status: 'offline'
    };
  }
}

/**
 * 格式化服务器状态信息用于显示
 * @param data 服务器状态数据
 * @returns 格式化后的显示对象
 */
export function formatServerStatus(data: ServerStatusData) {
  return {
    online: data.p !== undefined && data.status !== 'offline',
    playerCount: data.p || 0,
    maxPlayers: data.mp || 50,
    displayText: `${data.p || 0}/${data.mp || 50}`
  };
}