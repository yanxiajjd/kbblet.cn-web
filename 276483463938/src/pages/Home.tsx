import { Header } from '@/components/Header';
import { ServerStatus } from '@/components/ServerStatus';
import { FeaturesSection } from '@/components/FeaturesSection';
import { GallerySection } from '@/components/GallerySection';
import { NewsSection } from '@/components/NewsSection';
import { StaffSection } from '@/components/StaffSection';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-50 z-10"></div>
          <img 
            src="https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d landscape with mountains, forests, and a lake at sunset, vibrant colors, epic view&image_size=landscape_16_9&sign=17fb6f368481f6bab2216c9603d8e6a8" 
            alt="Minecraft landscape"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-gray-800 leading-tight mb-6"
            >
              欢迎来到 <span className="text-[#4CAF50]">KBB</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            >
              加入我们充满活力的Minecraft社区，探索无限可能，创造属于你的传奇故事。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ServerStatus />
            </motion.div>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-gray-50">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* News Section */}
      <NewsSection />
      
      {/* Staff Section */}
      <StaffSection />
      
      {/* Join Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-16 overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">准备好加入冒险了吗？</h2>
                <p className="text-gray-600 mb-8 text-lg">
                  加入我们不断成长的社区，与来自世界各地的玩家一起创造、探索和冒险。
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-[#4CAF50] mt-1 mr-3"></i>
                    <span>简单几步即可加入我们的服务器</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-[#4CAF50] mt-1 mr-3"></i>
                    <span>友好的社区和活跃的管理员团队</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-[#4CAF50] mt-1 mr-3"></i>
                    <span>定期举办的社区活动和比赛</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-4 rounded-full transition-all duration-300 font-bold text-lg shadow-lg shadow-green-500/20">
                    立即加入
                  </button>
                  <button className="bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 font-bold text-lg">
                    查看教程
                  </button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d players collaborating on a build, happy and friendly atmosphere&image_size=portrait_4_3&sign=17fb6f368481f6bab2216c9603d8e6a8" 
                  alt="Minecraft players"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}