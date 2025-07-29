import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/contexts/authContext.tsx';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // 处理密码提交
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const success = await login(password);
      if (success) {
        toast.success('登录成功');
        setPassword('');
      } else {
        toast.error('密码错误，请重试');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50] mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }
  
  // 如果未认证，显示登录表单
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-16 p-8 max-w-md w-full shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">管理员登录</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">请输入管理员密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                required
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> 验证中...
                </div>
              ) : (
                "登录"
              )}
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="/" className="inline-block text-gray-600 hover:text-[#4CAF50] transition-colors">
              返回首页
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  // 已认证，显示管理员面板
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-800"
            >
              管理员后台
            </motion.h1>
            <button
              onClick={() => {
                logout();
                toast.success('已退出登录');
                navigate('/');
              }}
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-sign-out-alt mr-2"></i> 退出登录
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 公告编辑卡片 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => navigate('/admin/announcements')}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">编辑公告</h3>
              <p className="text-gray-600 mb-6">创建、编辑和删除服务器公告</p>
              <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                进入编辑
              </div>
            </motion.div>
            
            {/* 团队管理卡片 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => navigate('/admin/staff')}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">管理团队</h3>
              <p className="text-gray-600 mb-6">添加、编辑和删除管理团队成员</p>
              <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                进入管理
              </div>
            </motion.div>
            
            {/* 画廊管理卡片 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => navigate('/admin/gallery')}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                <i className="fa-solid fa-images"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">编辑画廊</h3>
              <p className="text-gray-600 mb-6">管理服务器画廊中的图片和描述</p>
              <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                进入编辑
              </div>
             </motion.div>
              {/* 捐赠者管理卡片 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
                onClick={() => navigate('/admin/donors')}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">管理捐赠者</h3>
                <p className="text-gray-600 mb-6">添加、编辑和删除捐赠人员名单</p>
                <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                  进入管理
                </div>
              </motion.div>

              {/* 修改密码卡片 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
                onClick={() => navigate('/admin/password')}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                  <i className="fa-solid fa-key"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">修改管理员密码</h3>
                <p className="text-gray-600 mb-6">更新管理员登录密码</p>
                <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                  进入修改
                </div>
              </motion.div>

              {/* 封禁名单卡片 */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-16 p-8 text-center border border-gray-200 transition-all duration-300 shadow-sm cursor-pointer"
                onClick={() => navigate('/ban-list')}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] text-2xl">
                  <i className="fa-solid fa-ban"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">封禁名单管理</h3>
                <p className="text-gray-600 mb-6">查看和管理被封禁玩家</p>
                <div className="inline-block bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-full transition-all duration-300">
                  查看名单
                </div>
              </motion.div>
            </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}