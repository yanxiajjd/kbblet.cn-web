import { serverInfo } from '@/mock/serverData';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#4CAF50] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KB</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">KBB</h2>
            </div>
            <p className="text-gray-600 mb-6">
              打造最佳的Minecraft游戏体验，结交志同道合的朋友，一起创造无限可能。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                <i className="fa-brands fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-6">快速链接</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">首页</a></li>
              <li><a href="#features" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">服务器特色</a></li>
              <li><a href="#gallery" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">画廊</a></li>
              <li><a href="#news" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">新闻</a></li>
              <li><a href="#staff" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">管理团队</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">规则</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-6">服务器信息</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-gray-600">IP地址:</span>
                <span className="text-gray-800 font-mono">{serverInfo.ip}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">端口:</span>
                <span className="text-gray-800">{serverInfo.port}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">版本:</span>
                <span className="text-gray-800">{serverInfo.version}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">游戏模式:</span>
                <span className="text-gray-800">{serverInfo.gameMode}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">在线状态:</span>
                <span className="text-green-500 font-medium">在线</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-800 font-bold text-lg mb-6">联系我们</h3>
            <p className="text-gray-600 mb-4">
              订阅更新请联系我们的官方邮箱：
            </p>
            <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center">
              <i className="fa-solid fa-envelope text-[#4CAF50] mr-3"></i>
              <span className="text-gray-800 font-medium">3253186469@qq.com</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 KBB. 保留所有权利。Minecraft 是 Mojang Studios 的注册商标。</p>
        </div>
      </div>
    </footer>
  );
}