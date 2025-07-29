import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">KB</span>
          </div>
          <h1 className="text-[clamp(1.2rem,3vw,1.8rem)] font-bold text-gray-800">KBB</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">首页</a>
          <a href="#features" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">特色</a>
          <a href="#gallery" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">画廊</a>
          <a href="#news" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">新闻</a>
          <a href="#staff" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">团队</a>
          <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-medium">
            加入服务器
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
         <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 flex flex-col space-y-4 animate-fadeIn">
          <a href="#" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">首页</a>
          <a href="#features" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">特色</a>
          <a href="#gallery" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">画廊</a>
          <a href="#news" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">新闻</a>
          <a href="#staff" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">团队</a>
          <button className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-5 py-3 rounded-full transition-all duration-300 font-medium">
            加入服务器
          </button>
        </div>
      )}
    </header>
  );
}