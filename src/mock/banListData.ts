/**
 * 封禁名单数据接口定义
 */
export interface BanListItem {
  /** 玩家名称 */
  playerName: string;
  /** 玩家UUID */
  uuid: string;
  /** 封禁原因 */
  reason: string;
  /** 封禁日期 */
  banDate: string;
  /** 解封日期，"永久"表示永久封禁 */
  unbanDate: string;
}

/**
 * 封禁名单模拟数据
 */
export const banListData: BanListItem[] = [
  {
    playerName: "cheater123",
    uuid: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    reason: "使用X-Ray透视作弊",
    banDate: "2025-06-15",
    unbanDate: "永久"
  },
  {
    playerName: "griefer456",
    uuid: "b2c3d4e5-f6a7-8901-bcde-234567890abc",
    reason: "恶意破坏他人建筑",
    banDate: "2025-07-02",
    unbanDate: "2025-12-02"
  },
  {
    playerName: "hacker789",
    uuid: "c3d4e5f6-a7b8-9012-cdef-34567890abcd",
    reason: "使用飞行和穿墙作弊",
    banDate: "2025-07-10",
    unbanDate: "永久"
  },
  {
    playerName: "toxicplayer00",
    uuid: "d4e5f6a7-b8c9-0123-defg-4567890abcde",
    reason: "严重辱骂其他玩家",
    banDate: "2025-07-20",
    unbanDate: "2025-08-20"
  }
];