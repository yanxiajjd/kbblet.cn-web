import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { newsItems } from '@/news/mock/newsData';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authContext.tsx';

// 定义公告类型接口
export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  link?: string;
}

export default function AnnouncementEditor() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState<NewsItem[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d announcement banner, important notice, official style&image_size=landscape_16_9&sign=17fb6f368481f6bab2216c9603d8e6a8'
  });
  const [editingAnnouncement, setEditingAnnouncement] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 检查认证状态
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && !authLoading) {
        navigate('/admin');
        toast.error('请先登录');
      }
    };
    
    checkAuth();
  }, [isAuthenticated, authLoading, navigate]);
  
  // 从localStorage加载数据或使用默认数据
  useEffect(() => {
    if (!isAuthenticated) return;
    const savedAnnouncements = localStorage.getItem('customAnnouncements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      setAnnouncements([...newsItems]);
    }
  }, [isAuthenticated]);
  
  // 保存数据到localStorage
  useEffect(() => {
    if (!isAuthenticated || announcements.length === 0) return;
    localStorage.setItem('customAnnouncements', JSON.stringify(announcements));
  }, [announcements, isAuthenticated]);
  
  // 如果未认证或加载中，不渲染内容
  if (!isAuthenticated || authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }
  
  // 处理新增公告
  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('标题和内容不能为空');
      return;
    }
    
    const newId = announcements.length > 0 
      ? Math.max(...announcements.map(item => item.id)) + 1 
      : 1;
      
    const announcementToAdd: NewsItem = {
      ...newAnnouncement,
      id: newId
    };
    
    setAnnouncements([announcementToAdd, ...announcements]);
    setNewAnnouncement({
      title: '',
      date: new Date().toISOString().split('T')[0],
      content: '',
      imageUrl: 'https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d announcement banner, important notice, official style&image_size=landscape_16_9&sign=17fb6f368481f6bab2216c9603d8e6a8'
    });
    
    toast.success('公告添加成功');
  };
  
  // 处理编辑公告
  const handleEditAnnouncement = () => {
    if (!editingAnnouncement || !editingAnnouncement.title || !editingAnnouncement.content) {
      toast.error('标题和内容不能为空');
      return;
    }
    
    setAnnouncements(announcements.map(item => 
      item.id === editingAnnouncement.id ? editingAnnouncement : item
    ));
    
    setEditingAnnouncement(null);
    toast.success('公告编辑成功');
  };
  
  // 处理删除公告
  const handleDeleteAnnouncement = (id: number) => {
    if (window.confirm('确定要删除这条公告吗？')) {
      setAnnouncements(announcements.filter(item => item.id !== id));
      toast.success('公告删除成功');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-800"
            >
              编辑公告
            </motion.h1>
            <Link 
              to="/admin" 
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回后台
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 公告列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">公告列表</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {announcements.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingAnnouncement({...item})}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteAnnouncement(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{item.date}</p>
                      <p className="text-gray-600 line-clamp-2 mb-4">{item.content}</p>
                      <div className="w-full h-40 rounded-12 overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 添加/编辑公告表单 */}
            <div>
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {editingAnnouncement ? '编辑公告' : '添加新公告'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">标题</label>
                    <input
                      type="text"
                      value={editingAnnouncement ? editingAnnouncement.title : newAnnouncement.title}
                      onChange={(e) => {
                        if (editingAnnouncement) {
                          setEditingAnnouncement({...editingAnnouncement, title: e.target.value});
                        } else {
                          setNewAnnouncement({...newAnnouncement, title: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">日期</label>
                    <input
                      type="date"
                      value={editingAnnouncement ? editingAnnouncement.date : newAnnouncement.date}
                      onChange={(e) => {
                        if (editingAnnouncement) {
                          setEditingAnnouncement({...editingAnnouncement, date: e.target.value});
                        } else {
                          setNewAnnouncement({...newAnnouncement, date: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">内容</label>
                    <textarea
                      value={editingAnnouncement ? editingAnnouncement.content : newAnnouncement.content}
                      onChange={(e) => {
                        if (editingAnnouncement) {
                          setEditingAnnouncement({...editingAnnouncement, content: e.target.value});
                        } else {
                          setNewAnnouncement({...newAnnouncement, content: e.target.value});
                        }
                      }}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">图片URL</label>
                    <input
                      type="text"
                      value={editingAnnouncement ? editingAnnouncement.imageUrl : newAnnouncement.imageUrl}
                      onChange={(e) => {
                        if (editingAnnouncement) {
                          setEditingAnnouncement({...editingAnnouncement, imageUrl: e.target.value});
                        } else {
                          setNewAnnouncement({...newAnnouncement, imageUrl: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div className="pt-4">
                    {editingAnnouncement ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleEditAnnouncement}
                          className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                        >
                          保存修改
                        </button>
                        <button
                          onClick={() => setEditingAnnouncement(null)}
                          className="w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddAnnouncement}
                        className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                      >
                        添加公告
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}