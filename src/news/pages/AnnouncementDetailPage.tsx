import { useParams } from 'react-router-dom';
import { newsItems } from '@/news/mock/newsData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function AnnouncementDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // Find the announcement with the matching ID
  const announcement = newsItems.find(item => item.id === Number(id));
  
  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">公告不存在</h1>
          <p className="text-gray-600 mb-8">找不到您请求的公告</p>
          <a 
            href="/announcements" 
            className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300 inline-block"
          >
            返回公告列表
          </a>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-16 shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="aspect-video w-full">
              <img 
                src={announcement.imageUrl} 
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="text-[#4CAF50] font-medium mb-2">{announcement.date}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {announcement.title}
              </h1>
               <div className="prose prose-lg text-gray-700 max-w-none">
                  <p className="mb-6">{announcement.content}</p>
                  {announcement.link && (
                    <a 
                      href={announcement.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4CAF50] hover:underline font-medium"
                    >
                      点击跳转
                    </a>
                  )}
                  {/* 如果有更多内容，可以在这里添加 */}
               </div>
              <div className="mt-10 flex space-x-4">
                <a 
                  href="/announcements" 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full transition-all duration-300 inline-block"
                >
                  查看所有公告
                </a>
                <a 
                  href="/" 
                  className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300 inline-block"
                >
                  返回首页
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}