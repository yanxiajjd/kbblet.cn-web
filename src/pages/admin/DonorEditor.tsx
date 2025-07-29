import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { donors, Donor } from '@/mock/donorData';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authContext.tsx';

export default function DonorEditor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [donorList, setDonorList] = useState<Donor[]>([]);
  const [newDonor, setNewDonor] = useState<Omit<Donor, 'id'>>({
    name: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    message: ''
  });
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  
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
    const savedDonors = localStorage.getItem('customDonorList');
    if (savedDonors) {
      setDonorList(JSON.parse(savedDonors));
    } else {
      setDonorList([...donors]);
    }
  }, [isAuthenticated]);
  
  // 保存数据到localStorage
  useEffect(() => {
    if (!isAuthenticated || donorList.length === 0) return;
    localStorage.setItem('customDonorList', JSON.stringify(donorList));
  }, [donorList, isAuthenticated]);
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null;
  }
  
  // 处理新增捐赠者
  const handleAddDonor = () => {
    if (!newDonor.name || newDonor.amount <= 0) {
      toast.error('姓名和捐赠金额不能为空');
      return;
    }
    
    const newId = donorList.length > 0 
      ? Math.max(...donorList.map(donor => donor.id)) + 1 
      : 1;
      
    const donorToAdd: Donor = {
      ...newDonor,
      id: newId
    };
    
    setDonorList([...donorList, donorToAdd]);
    setNewDonor({
      name: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      message: ''
    });
    
    toast.success('捐赠者添加成功');
  };
  
  // 处理编辑捐赠者
  const handleEditDonor = () => {
    if (!editingDonor || !editingDonor.name || editingDonor.amount <= 0) {
      toast.error('姓名和捐赠金额不能为空');
      return;
    }
    
    setDonorList(donorList.map(donor => 
      donor.id === editingDonor.id ? editingDonor : donor
    ));
    
    setEditingDonor(null);
    toast.success('捐赠者信息编辑成功');
  };
  
  // 处理删除捐赠者
  const handleDeleteDonor = (id: number) => {
    if (window.confirm('确定要删除这位捐赠者吗？')) {
      setDonorList(donorList.filter(donor => donor.id !== id));
      toast.success('捐赠者删除成功');
    }
    setEditingDonor(null);
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
              管理捐赠人员名单
            </motion.h1>
            <Link 
              to="/admin" 
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回后台
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 捐赠者列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">捐赠者名单</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-4 px-6 font-bold text-gray-800">捐赠者</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-800">金额 (元)</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-800">日期</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-800">留言</th>
                        <th className="text-left py-4 px-6 font-bold text-gray-800">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {donorList.map((donor) => (
                        <tr key={donor.id} className="hover:bg-gray-50 transition-colors duration-300">
                          <td className="py-4 px-6 font-medium text-gray-800">{donor.name}</td>
                          <td className="py-4 px-6 text-[#4CAF50] font-medium">¥{donor.amount}</td>
                          <td className="py-4 px-6 text-gray-600">{donor.date}</td>
                          <td className="py-4 px-6 text-gray-600 max-w-xs truncate">{donor.message || '-'}</td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setEditingDonor({...donor})}
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                              >
                                <i className="fa-solid fa-edit"></i>
                              </button>
                              <button 
                                onClick={() => handleDeleteDonor(donor.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {donorList.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <i className="fa-solid fa-inbox text-4xl mb-4"></i>
                    <p>暂无捐赠者数据</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* 添加/编辑捐赠者表单 */}
            <div>
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {editingDonor ? '编辑捐赠者' : '添加新捐赠者'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">捐赠者姓名</label>
                    <input
                      type="text"
                      value={editingDonor ? editingDonor.name : newDonor.name}
                      onChange={(e) => {
                        if (editingDonor) {
                          setEditingDonor({...editingDonor, name: e.target.value});
                        } else {
                          setNewDonor({...newDonor, name: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">捐赠金额 (元)</label>
                    <input
                      type="number"
                      min="1"
                      value={editingDonor ? editingDonor.amount : newDonor.amount}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        if (editingDonor) {
                          setEditingDonor({...editingDonor, amount: value});
                        } else {
                          setNewDonor({...newDonor, amount: value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">捐赠日期</label>
                    <input
                      type="date"
                      value={editingDonor ? editingDonor.date : newDonor.date}
                      onChange={(e) => {
                        if (editingDonor) {
                          setEditingDonor({...editingDonor, date: e.target.value});
                        } else {
                          setNewDonor({...newDonor, date: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">留言 (可选)</label>
                    <textarea
                      value={editingDonor ? editingDonor.message : newDonor.message}
                      onChange={(e) => {
                        if (editingDonor) {
                          setEditingDonor({...editingDonor, message: e.target.value});
                        } else {
                          setNewDonor({...newDonor, message: e.target.value});
                        }
                      }}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                      placeholder="请输入捐赠留言（选填）"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    {editingDonor ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleEditDonor}
                          className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                        >
                          保存修改
                        </button>
                        <button
                          onClick={() => setEditingDonor(null)}
                          className="w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddDonor}
                        className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                      >
                        添加捐赠者
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
