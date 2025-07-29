import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { banListData } from '@/mock/banListData';

export default function BanListPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* 页头组件 */}
      <Header />
      
      {/* 封禁名单区域 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">服务器封禁名单</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              以下是违反服务器规则被封禁的玩家名单，封禁期限根据违规严重程度而定
            </p>
          </motion.div>
          
          <div className="bg-white rounded-16 shadow-lg border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-bold text-gray-800">玩家名称</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-800">UUID</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-800">封禁原因</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-800">封禁日期</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-800">解封日期</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {banListData.map((ban, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 transition-colors duration-300"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">{ban.playerName}</td>
                      <td className="py-4 px-6 text-gray-600 font-mono text-sm max-w-xs truncate">{ban.uuid}</td>
                      <td className="py-4 px-6 text-gray-600">{ban.reason}</td>
                      <td className="py-4 px-6 text-gray-600">{ban.banDate}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {ban.unbanDate === "永久" ? (
                          <span className="text-red-500 font-medium">永久封禁</span>
                        ) : (
                          ban.unbanDate
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {banListData.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <i className="fa-solid fa-check-circle text-4xl mb-4 text-green-500"></i>
                <p className="text-lg">目前没有被封禁的玩家</p>
              </div>
            )}
            
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                服务器规则：禁止作弊、恶意破坏、辱骂他人等行为。如有异议，请联系管理员。
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/" 
              className="inline-flex items-center text-[#4CAF50] font-medium hover:underline"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              返回首页
            </a>
          </div>
        </div>
      </section>
      
      {/* 页脚组件 */}
      <Footer />
    </div>
  );
}