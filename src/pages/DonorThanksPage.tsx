import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { donors } from '@/mock/donorData';
import { motion } from 'framer-motion';

export default function DonorThanksPage() {
  // Group donors by contribution amount (descending)
  const sortedDonors = [...donors].sort((a, b) => b.amount - a.amount);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-800 mb-4">捐赠感谢名单</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              感谢以下玩家对服务器的慷慨支持，你们的捐赠将直接用于服务器的维护和发展
            </p>
          </motion.div>
          
          <div className="bg-white rounded-16 shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-800">捐赠者</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800">金额 (元)</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800">日期</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800">留言</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDonors.map((donor) => (
                      <tr 
                        key={donor.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="py-4 px-4 font-medium text-gray-800">{donor.name}</td>
                        <td className="py-4 px-4 text-[#4CAF50] font-medium">{donor.amount}</td>
                        <td className="py-4 px-4 text-gray-600">{donor.date}</td>
                        <td className="py-4 px-4 text-gray-600">{donor.message || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 bg-gray-50 rounded-12 p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">总计捐赠金额: ¥1,125</h3>
                <p className="text-gray-600 text-sm">
                  所有捐赠将用于服务器维护、升级和社区活动。感谢每一位支持者的慷慨贡献！
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <a 
                  href="/donate" 
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300 inline-block"
                >
                  立即捐赠
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}