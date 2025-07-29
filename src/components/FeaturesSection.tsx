import { serverInfo } from '@/mock/serverData';
import { motion } from 'framer-motion';

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">服务器特色</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            探索我们精心打造的游戏世界，体验独特的玩法和社区氛围
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Additional特色 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: serverInfo.features.length * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-shield-alt"></i>
            </div>
                     <h3 className="text-xl font-bold text-gray-800 mb-3">安全的游戏环境</h3>
                     <p className="text-gray-600 mb-2">
                       严格的反作弊系统和活跃的管理员团队，确保公平游戏环境。
                     </p>
                     <a href="/ban-list" className="text-[#4CAF50] hover:underline text-sm flex items-center">
                       查看封禁名单 <i className="fa-solid fa-arrow-right ml-1"></i>
                     </a>
                   </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (serverInfo.features.length + 1) * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">LEAVES核心</h3>
            <p className="text-gray-600">
              生电核心保留特性,允许所有机器
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (serverInfo.features.length + 2) * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-balance-scale"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">绝对平等</h3>
            <p className="text-gray-600">
              所有人包括服务器和管理员没有op权限
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (serverInfo.features.length + 3) * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
             <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
               <i className="fa-solid fa-cloud"></i>
             </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">轻松无压力</h3>
            <p className="text-gray-600">
              死亡不掉落,无需担心背包损失
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (serverInfo.features.length + 4) * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-puzzle-piece"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">微插件</h3>
            <p className="text-gray-600 mb-2">
              可更换皮肤,一键恢复熊孩子破坏,主城传送
            </p>
            <a href="/commands" className="text-[#4CAF50] hover:underline text-sm flex items-center">
              查看指令 <i className="fa-solid fa-arrow-right ml-1"></i>
            </a>
          </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: (serverInfo.features.length + 5) * 0.1 }}
             className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
           >
             <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
               <i className="fa-solid fa-exchange"></i>
             </div>
             <h3 className="text-xl font-bold text-gray-800 mb-3">互通</h3>
             <p className="text-gray-600">
               Java版基岩版均可进入
             </p>
           </motion.div>
        </div>
      </div>
    </section>
  );
}