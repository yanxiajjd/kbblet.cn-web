import { motion } from 'framer-motion';
import { newsItems } from '@/mock/newsData';

export function NewsSection() {
  return (
    <section id="news" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">最新公告</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            了解服务器的最新动态、活动和更新信息
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-16 overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 group"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-[#4CAF50] font-medium mb-2">{item.date}</div><h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#4CAF50] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <a href="#" className="inline-flex items-center text-[#4CAF50] font-medium hover:underline">
                  阅读更多 <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-transparent border border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-medium">
            查看所有公告
          </button>
        </div>
      </div>
    </section>
  )
}