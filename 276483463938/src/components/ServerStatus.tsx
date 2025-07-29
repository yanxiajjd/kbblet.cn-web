import { serverInfo } from '@/mock/serverData';
import { motion } from 'framer-motion';

export function ServerStatus() {
  // 使用静态数据，不进行动态获取
  const status = {
    online: serverInfo.online,
    players: {
      online: serverInfo.playerCount,
      max: serverInfo.maxPlayers
    },
    version: serverInfo.version
  };

  return (
    <div className="bg-white rounded-16 p-6 shadow-xl border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800 mb-2">服务器状态</h2>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className={`w-3 h-3 rounded-full ${status.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-800 font-medium text-lg">
              {status.online ? '在线' : '离线'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
            <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
              <p className="text-gray-500 text-sm mb-1">服务器IP</p>
              <p className="text-gray-800 font-mono font-medium">{serverInfo.ip}</p>
            </div>
            <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
              <p className="text-gray-500 text-sm mb-1">端口</p>
              <p className="text-gray-800 font-mono font-medium">{serverInfo.port}</p>
            </div>
            <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
              <p className="text-gray-500 text-sm mb-1">版本</p>
              <p className="text-gray-800 font-medium">{status.version}</p>
             </div>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!status.online}
          className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-4 rounded-full transition-all duration-300 font-bold text-lg shadow-lg shadow-green-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status.online ? '立即加入' : '服务器离线'}
        </motion.button>
      </div>
    </div>
  );
}