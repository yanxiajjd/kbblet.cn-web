import { serverInfo } from '@/mock/serverData';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
        <div className="flex items-center space-x-2 mb-6">
          <img 
            src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276483463938/attachment/ic_launcher_20250728121829.png" 
            alt="KBB Logo" 
            className="w-10 h-10 rounded-lg object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800">KBB</h2>
            </div>
            <p className="text-gray-600 mb-6">
              联系与捐赠
            </p>
              <div className="flex space-x-4">
                <a href="https://qm.qq.com/q/nLG9o7UMwg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                  <i className="fa-brands fa-qq"></i>
                </a>
    <a href="https://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=3253186469@qq.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
      <i className="fa-regular fa-envelope"></i>
   </a>
        <a href="/donate" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
          <i className="fa-brands fa-weixin"></i>
        </a>
                    <a href="https://space.bilibili.com/1677424766?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                      <i className="fa-brands fa-bilibili"></i>
                    </a>
                 <a href="https://github.com/yanxiajjd/KBBLET" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#4CAF50] hover:text-white transition-colors duration-300">
                   <i className="fa-brands fa-github"></i>
                 </a>
             </div>
          </div>
          
             <div> 
               <h3 className="text-gray-800 font-bold text-lg mb-6">快速链接</h3>
               <ul className="space-y-4">
                 <li><a href="#" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">首页</a></li>
                 <li><a href="#" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">规则</a></li>
                 <li><a href="/donor-thanks" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">捐赠感谢</a></li>
                 <li><a href="/admin" className="text-gray-600 hover:text-[#4CAF50] transition-colors duration-300">管理员后台</a></li>
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
                  <span className="text-gray-600">资源下载:</span>
                  <a href="https://www.123865.com/s/anDgTd-ZyiUH" className="text-[#4CAF50] hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                    <i className="fa-solid fa-download mr-1"></i> 123云盘
                  </a>
                </li>
              <li className="flex justify-between">
                <span className="text-gray-600">版本:</span>
                <span className="text-gray-800">{serverInfo.version}</span>
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