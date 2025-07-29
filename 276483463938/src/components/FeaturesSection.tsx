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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serverInfo.features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
                <i className="fa-solid fa-cube"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature}</h3>
              <p className="text-gray-600">
                精心设计的游戏体验，让你在方块世界中创造无限可能。
              </p>
            </motion.div>
          ))}
          
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
            <p className="text-gray-600">
              严格的反作弊系统和活跃的管理员团队，确保公平游戏环境。
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (serverInfo.features.length + 1) * 0.1 }}
            className="bg-white rounded-16 p-6 border border-gray-200 hover:border-[#4CAF50] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-12 flex items-center justify-center mb-5 text-[#4CAF50] text-2xl group-hover:bg-[#4CAF50] group-hover:text-white transition-all duration-300">
              <i className="fa-solid fa-calendar-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">定期活动</h3>
            <p className="text-gray-600">
              每周举办有趣的社区活动，赢取独家奖励和荣誉。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}