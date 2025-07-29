import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchKbbletData, formatServerStatus } from '@/getplayer/getplayer';
import { ServerStatusData } from '@/getplayer/getplayer';
import { serverInfo } from '@/mock/serverData';

/**
 * 服务器状态组件
 * 显示服务器的基本信息、在线状态和在线人数
 * 提供加入服务器的按钮
 */
export function ServerStatus() {
  const [serverData, setServerData] = useState<ServerStatusData>({ p: 0, mp: 50 });
  const [isLoading, setIsLoading] = useState(true);
  
  // 获取服务器数据
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchKbbletData();
      setServerData(data);
    } catch (error) {
      console.error('Failed to fetch server data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 手动刷新数据
  const handleRefresh = () => {
    fetchData();
  };
  
  useEffect(() => {
    // 初始加载
    fetchData();
    
    // 每30秒刷新一次数据
    const interval = setInterval(fetchData, 30000);
    
    // 清理函数
    return () => clearInterval(interval);
  }, []);
  
  // 格式化服务器状态数据
  const status = formatServerStatus(serverData);

  return (
    <div className="bg-white rounded-16 p-6 shadow-xl border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="text-center">
           <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800 mb-4">服务器地址</h2>
           
             {/* 服务器基本信息卡片网格 */}
             <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
               {/* 服务器IP卡片 */}
               <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                 <p className="text-gray-500 text-sm mb-1">服务器IP</p>
                 <p className="text-gray-800 font-mono font-medium">{serverInfo.ip}</p>
               </div>
               
               {/* 资源下载卡片 */}
               <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-[#4CAF50] transition-colors duration-300 flex flex-col items-center">
                 <p className="text-gray-500 text-sm mb-1">资源下载</p>
                 <a href="https://www.123865.com/s/anDgTd-ZyiUH" className="text-[#4CAF50] font-medium hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                   <i className="fa-solid fa-download mr-1"></i> 123云盘
                 </a>
               </div>
               
               {/* 服务器版本卡片 */}
               <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                 <p className="text-gray-500 text-sm mb-1">版本</p>
                 <p className="text-gray-800 font-medium">1.21.4</p>
               </div>
             </div>
            
             {/* 服务器状态部分 */}
               <div className="mt-6">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-lg font-bold text-gray-800">服务器状态</h3>
                    <button 
                      onClick={handleRefresh}
                      className="text-gray-500 hover:text-[#4CAF50] transition-colors p-1 flex items-center"
                      aria-label="刷新服务器状态"
                    >
                      <i className="fa-solid fa-refresh"></i>
                    </button>
                 </div>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* 在线人数卡片 */}
                    <div className="bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-300 text-center">
                      <p className="text-gray-500 text-sm mb-1">在线人数</p>
                      <div className="flex items-center justify-center">
                        <p className="text-gray-800 font-mono font-medium">
                          {isLoading ? (
                            <span className="animate-pulse">Loading...</span>
                          ) : (
                            status.displayText
                          )}
                        </p>
                      </div>
                   </div>
                  
                  {/* 服务器状态卡片 */}
                   <div className={`bg-gray-50 rounded-12 p-4 border border-gray-200 hover:border-${status.online ? 'green' : 'red'}-300 transition-colors duration-300 text-center`}>
                     <p className="text-gray-500 text-sm mb-1">服务器状态</p>
                     <div className="flex items-center justify-center">
                       <p className={`text-${status.online ? 'green' : 'red'}-500 font-medium flex items-center`}>
                         {isLoading ? (
                           <span className="animate-pulse"><i className="fa-solid fa-circle text-xs mr-2"></i> 加载中...</span>
                         ) : (
                           <><i className="fa-solid fa-circle text-xs mr-2"></i> {status.online ? '在线' : '离线'}</>
                         )}
                       </p>
                     </div>
                  </div>
                </div>
             </div>
        </div>
        
          {/* 加入服务器按钮 - 使用motion实现悬停和点击动画效果 */}
          <motion.a
             href={status.online ? "https://qm.qq.com/q/nLG9o7UMwg" : "#"}
             target={status.online ? "_blank" : "_self"}
             rel={status.online ? "noopener noreferrer" : ""}
             whileHover={{ scale: status.online ? 1.05 : 1 }}
             whileTap={{ scale: status.online ? 0.95 : 1 }}
             disabled={!status.online}
             className={`${status.online ? 'bg-[#4CAF50] hover:bg-[#388E3C] shadow-green-500/20' : 'bg-gray-400 cursor-not-allowed'} text-white px-8 py-4 rounded-full transition-all duration-300 font-bold text-lg shadow-lg disabled:opacity-70 inline-block`}
           >
             {status.online ? '立即加入' : '服务器离线'}
           </motion.a>
      </div>
    </div>
  );
}