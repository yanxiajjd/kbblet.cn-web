import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 网站头部导航组件
 * 包含响应式导航栏、logo和导航链接
 * 支持导航栏折叠/展开功能，并在localStorage中保存状态
 */
export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 移动端菜单是否打开
  const [collapseTimer, setCollapseTimer] = useState<number | null>(null); // 折叠动画定时器
  
  // 从localStorage初始化折叠状态
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem('navbarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  
  // 图标位置状态 - 用于处理折叠动画
  const [isIconPositioned, setIsIconPositioned] = useState(isCollapsed);
  
  // 当折叠状态变化时，保存到localStorage
  useEffect(() => {
    localStorage.setItem('navbarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  
  // 判断当前是否为首页
  const isHomePage = location.pathname === '/';
  
  /**
   * 切换导航栏折叠/展开状态
   * 处理折叠动画的定时器和图标位置更新
   */
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // 清除任何现有的定时器
    if (collapseTimer) {
      clearTimeout(collapseTimer);
    }
    
    // 设置定时器更新图标位置 - 仅在折叠时延迟
    const delay = newState ? 1000 : 0; // 仅在折叠时延迟1秒
    const timer = setTimeout(() => {
      setIsIconPositioned(newState);
    }, delay);
    
    setCollapseTimer(timer);
  };
  
  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (collapseTimer) {
        clearTimeout(collapseTimer);
      }
    };
  }, [collapseTimer]);
  
   return (
    <header className={`fixed top-4 z-50 w-full max-w-5xl transition-all duration-500 ${isIconPositioned ? 'left-4' : 'left-1/2 transform -translate-x-1/2'}`}>
      <div className={`transition-all duration-500 ${isCollapsed ? 'p-2' : 'bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 overflow-hidden py-3'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo - 点击可切换折叠状态 */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleCollapse}
          >
            <img 
              src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276483463938/attachment/ic_launcher_20250728121829.png" 
              alt="KBB Logo" 
              className="w-10 h-10 rounded-lg object-contain transition-transform duration-300 hover:scale-110"
            />
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold text-gray-800"
              >
                KBB
              </motion.h1>
            )}
          </div>
          
          {/* 桌面端导航 - 根据折叠状态条件渲染 */}
          {!isCollapsed && (
            <motion.nav 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
             className="hidden md:flex items-center justify-end space-x-8"

            >
               {/* 仅在首页显示导航链接 */}
               {isHomePage && (
                 <>
                   <a href="#" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">首页</a>
                   <a href="#features" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">特色</a>
                   <a href="#gallery" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">画廊</a>
                   <a href="#news" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">新闻</a>
                   <a href="#staff" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium">团队</a>
                 </>
               )}
               
               {/* 非首页时显示返回首页按钮 */}
               {!isHomePage && (
                 <a 
                   href="/" 
                   className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-medium inline-block"
                 >
                   回到主页
                 </a>
               )}
               
               {/* 加入服务器按钮 */}
               <a href="https://qm.qq.com/q/nLG9o7UMwg" target="_blank" rel="noopener noreferrer" className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-medium inline-block">
                 加入服务器
               </a>
            </motion.nav>
          )}
          
          {/* 仅在未折叠时显示移动端菜单按钮 */}

          
        </div>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 py-4 px-4 flex flex-col space-y-4"
          >
            <a href="#" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">首页</a>
            <a href="#features" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">特色</a>
            <a href="#gallery" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">画廊</a>
            <a href="#news" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">新闻</a>
            <a href="#staff" className="text-gray-800 hover:text-[#4CAF50] transition-colors duration-300 font-medium py-2">团队</a>
              <a href="https://qm.qq.com/q/nLG9o7UMwg" target="_blank" rel="noopener noreferrer" className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-5 py-3 rounded-full transition-all duration-300 font-medium inline-block">
                加入服务器
              </a>
          </motion.div>
        )}
      </div>
    </header>
  );
}