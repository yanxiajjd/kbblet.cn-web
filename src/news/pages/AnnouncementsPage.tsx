import { Link } from 'react-router-dom';
import { newsItems } from '@/news/mock/newsData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function AnnouncementsPage() {
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">所有公告</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              浏览服务器的最新公告和更新信息
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-16 overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 aspect-video md:aspect-auto">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="text-[#4CAF50] font-medium mb-2">{item.date}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#4CAF50] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                    <Link 
                      to={`/announcements/${item.id}`} 
                      className="inline-flex items-center text-[#4CAF50] font-medium hover:underline"
                    >
                      阅读更多 <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 font-medium hover:text-[#4CAF50]"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              返回首页
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}