// Donor information TypeScript interface
export interface Donor {
  id: number;
  name: string;
  amount: number;
  date: string;
  message?: string;
}

// Donor mock data
export const donors: Donor[] = [
  {
    id: 1,
    name: "盐虾",
    amount: 200,
    date: "2025-01-15",
    message: "祝服务器越办越好！"
  },
  {
    id: 2,
    name: "铁头男",
    amount: 150,
    date: "2025-02-20"
  },
  {
    id: 3,
    name: "幽幽子",
    amount: 100,
    date: "2025-03-05",
    message: "支持服务器发展"
  },
  {
    id: 4,
    name: "猫猫",
    amount: 300,
    date: "2025-03-18"
  },
  {
    id: 5,
    name: "小红",
    amount: 50,
    date: "2025-04-02"
  },
  {
    id: 6,
    name: "小明",
    amount: 75,
    date: "2025-04-15"
  },
  {
    id: 7,
    name: "小刚",
    amount: 120,
    date: "2025-05-01",
    message: "希望服务器越来越好"
  },
  {
    id: 8,
    name: "小丽",
    amount: 50,
    date: "2025-05-20"
  }
];