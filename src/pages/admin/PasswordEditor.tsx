import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authContext.tsx';

export default function PasswordEditor() {
  const { isAuthenticated, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // 检查认证状态
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      toast.error('请先登录');
    }
  }, [isAuthenticated, navigate]);
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null;
  }
  
  // 处理密码修改
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 表单验证
    if (!currentPassword) {
      setError('请输入当前密码');
      return;
    }
    
    if (!newPassword) {
      setError('请输入新密码');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('新密码长度不能少于6个字符');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('两次输入的新密码不一致');
      return;
    }
    
    // 更新密码
    const success = updatePassword(currentPassword, newPassword);
    if (success) {
      toast.success('密码修改成功，请使用新密码登录');
      // 重置表单
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError('当前密码不正确');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex justify-between items-center mb-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-800"
            >
              修改管理员密码
            </motion.h1>
            <Link 
              to="/admin" 
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回后台
            </Link>
          </div>
          
          <div className="bg-white rounded-16 border border-gray-200 shadow-sm p-8">
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-12">
                  <i className="fa-solid fa-exclamation-circle mr-2"></i> {error}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">当前密码</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">新密码 (至少6个字符)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">确认新密码</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i> 处理中...
                    </div>
                  ) : (
                    "更新密码"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}