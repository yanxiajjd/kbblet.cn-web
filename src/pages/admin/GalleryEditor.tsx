import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { galleryImages } from '@/mock/galleryData';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authContext.tsx';

// 定义画廊图片类型接口
export interface GalleryImage {
  id: number;
  title: string;
  url: string;
}

export default function GalleryEditor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImage, setNewImage] = useState<Omit<GalleryImage, 'id'>>({
    title: '',
    url: 'https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d minecraft building, amazing architecture, detailed view&image_size=square&sign=17fb6f368481f6bab2216c9603d8e6a8'
  });
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  
  // 检查认证状态
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      toast.error('请先登录');
    }
  }, [isAuthenticated, navigate]);
  
  // 从localStorage加载数据或使用默认数据
  useEffect(() => {
    if (!isAuthenticated) return;
    const savedImages = localStorage.getItem('customGalleryImages');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      setImages([...galleryImages]);
    }
  }, [isAuthenticated]);
  
  // 保存数据到localStorage
  useEffect(() => {
    if (!isAuthenticated || images.length === 0) return;
    localStorage.setItem('customGalleryImages', JSON.stringify(images));
  }, [images, isAuthenticated]);
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null;
  }
  
  // 处理新增图片
  const handleAddImage = () => {
    if (!newImage.title || !newImage.url) {
      toast.error('标题和图片URL不能为空');
      return;
    }
    
    const newId = images.length > 0 
      ? Math.max(...images.map(image => image.id)) + 1 
      : 1;
      
    const imageToAdd: GalleryImage = {
      ...newImage,
      id: newId
    };
    
    setImages([...images, imageToAdd]);
    setNewImage({
      title: '',
      url: 'https://space.coze.cn/api/coze_space/gen_image?prompt=Minecraft&sign=cd5509f44a3d70caca1f679b81b78d8d minecraft building, amazing architecture, detailed view&image_size=square&sign=17fb6f368481f6bab2216c9603d8e6a8'
    });
    
    toast.success('画廊图片添加成功');
  };
  
  // 处理编辑图片
  const handleEditImage = () => {
    if (!editingImage || !editingImage.title || !editingImage.url) {
      toast.error('标题和图片URL不能为空');
      return;
    }
    
    setImages(images.map(image => 
      image.id === editingImage.id ? editingImage : image
    ));
    
    setEditingImage(null);
    toast.success('画廊图片编辑成功');
  };
  
  // 处理删除图片
  const handleDeleteImage = (id: number) => {
    if (window.confirm('确定要删除这张图片吗？')) {
      setImages(images.filter(image => image.id !== id));
      toast.success('画廊图片删除成功');
    }
    setEditingImage(null);
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
              编辑服务器画廊
            </motion.h1>
            <Link 
              to="/admin" 
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回后台
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 画廊图片列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">画廊图片</h2>
                </div>
                
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div 
                      key={image.id} 
                      className="group relative rounded-12 overflow-hidden aspect-square border border-gray-200"
                    >
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                        <div className="text-center">
                          <h3 className="text-white font-bold mb-2 truncate">{image.title}</h3>
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => setEditingImage({...image})}
                              className="text-white hover:text-blue-300 transition-colors"
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteImage(image.id)}
                              className="text-white hover:text-red-300 transition-colors"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 添加/编辑图片表单 */}
            <div>
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {editingImage ? '编辑图片' : '添加新图片'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">图片标题</label>
                    <input
                      type="text"
                      value={editingImage ? editingImage.title : newImage.title}
                      onChange={(e) => {
                        if (editingImage) {
                          setEditingImage({...editingImage, title: e.target.value});
                        } else {
                          setNewImage({...newImage, title: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">图片URL</label>
                    <input
                      type="text"
                      value={editingImage ? editingImage.url : newImage.url}
                      onChange={(e) => {
                        if (editingImage) {
                          setEditingImage({...editingImage, url: e.target.value});
                        } else {
                          setNewImage({...newImage, url: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  {editingImage && (
                    <div className="mt-4">
                      <label className="block text-gray-700 mb-2 text-sm font-medium">预览</label>
                      <div className="aspect-square rounded-12 overflow-hidden border border-gray-200">
                        <img 
                          src={editingImage.url} 
                          alt={editingImage.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    {editingImage ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleEditImage}
                          className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                        >
                          保存修改
                        </button>
                        <button
                          onClick={() => setEditingImage(null)}
                          className="w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddImage}
                        className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                      >
                        添加图片
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