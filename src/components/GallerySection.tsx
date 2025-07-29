import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryImages as defaultGalleryImages } from '@/mock/galleryData';

export function GallerySection() {
  // 获取画廊图片数据，优先使用localStorage中的自定义数据
  const [galleryImages, setGalleryImages] = useState(defaultGalleryImages);
  
  useEffect(() => {
    try {
      const savedGallery = localStorage.getItem('customGalleryImages');
      if (savedGallery) {
        const parsedGallery = JSON.parse(savedGallery);
        if (Array.isArray(parsedGallery) && parsedGallery.length > 0) {
          setGalleryImages(parsedGallery);
        }
      }
    } catch (error) {
      console.error('Failed to load custom gallery images:', error);
    }
  }, []);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const openImageModal = (url: string) => {
    setSelectedImage(url);
  };
  
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">服务器画廊</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            探索我们玩家和管理员精心打造的精彩建筑和景观
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              whileHover={{ scale: 1.02 }}
              className="rounded-16 overflow-hidden cursor-pointer group relative aspect-square shadow-md"
              onClick={() => openImageModal(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-bold text-xl">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
              onClick={closeImageModal}
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery enlarged view"
              className="w-full h-full object-contain rounded-16"
            />
          </div>
        </div>
      )}
    </section>
  );
}