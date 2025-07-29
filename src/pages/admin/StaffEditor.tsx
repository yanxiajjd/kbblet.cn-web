import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { staffMembers } from '@/mock/staffData';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/authContext.tsx';

// 定义团队成员类型接口
export interface StaffMember {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
}

export default function StaffEditor() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [newMember, setNewMember] = useState<Omit<StaffMember, 'id'>>({
    name: '',
    role: '',
    avatarUrl: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/276483463938/attachment/b_6e00f118045dea5679b5d75b832f61cf_20250728133446.jpg',
    bio: ''
  });
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  
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
    const savedStaff = localStorage.getItem('customStaff');
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff));
    } else {
      setStaff([...staffMembers]);
    }
  }, [isAuthenticated]);
  
  // 保存数据到localStorage
  useEffect(() => {
    if (!isAuthenticated || staff.length === 0) return;
    localStorage.setItem('customStaff', JSON.stringify(staff));
  }, [staff, isAuthenticated]);
  
  // 如果未认证，不渲染内容
  if (!isAuthenticated) {
    return null;
  }
  
  // 处理新增团队成员
  const handleAddMember = () => {
    if (!newMember.name || !newMember.role) {
      toast.error('姓名和角色不能为空');
      return;
    }
    
    const newId = staff.length > 0 
      ? Math.max(...staff.map(member => member.id)) + 1 
      : 1;
      
    const memberToAdd: StaffMember = {
      ...newMember,
      id: newId
    };
    
    setStaff([...staff, memberToAdd]);
    setNewMember({
      name: '',
      role: '',
      avatarUrl: 'https://lf-code-agent.coze.cn/obj/x-ai-cn/276483463938/attachment/b_6e00f118045dea5679b5d75b832f61cf_20250728133446.jpg',
      bio: ''
    });
    
    toast.success('团队成员添加成功');
  };
  
  // 处理编辑团队成员
  const handleEditMember = () => {
    if (!editingMember || !editingMember.name || !editingMember.role) {
      toast.error('姓名和角色不能为空');
      return;
    }
    
    setStaff(staff.map(member => 
      member.id === editingMember.id ? editingMember : member
    ));
    
    setEditingMember(null);
    toast.success('团队成员编辑成功');
  };
  
  // 处理删除团队成员
  const handleDeleteMember = (id: number) => {
    if (window.confirm('确定要删除这个团队成员吗？')) {
      setStaff(staff.filter(member => member.id !== id));
      toast.success('团队成员删除成功');
    }
    setEditingMember(null);
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
              管理团队成员
            </motion.h1>
            <Link 
              to="/admin" 
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full transition-all duration-300"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> 返回后台
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 团队成员列表 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">团队成员</h2>
                </div>
                
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {staff.map((member) => (
                    <div 
                      key={member.id} 
                      className="flex items-start p-4 border border-gray-200 rounded-12 hover:border-[#4CAF50] transition-colors duration-300"
                    >
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4CAF50] mr-4 flex-shrink-0">
                        <img 
                          src={member.avatarUrl} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-gray-800 truncate">{member.name}</h3>
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => setEditingMember({...member})}
                              className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>
                            <button 
                              onClick={() => handleDeleteMember(member.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-[#4CAF50] font-medium mb-2">{member.role}</p>
                        <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 添加/编辑团队成员表单 */}
            <div>
              <div className="bg-white rounded-16 border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {editingMember ? '编辑团队成员' : '添加团队成员'}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">姓名</label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.name : newMember.name}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({...editingMember, name: e.target.value});
                        } else {
                          setNewMember({...newMember, name: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">角色</label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.role : newMember.role}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({...editingMember, role: e.target.value});
                        } else {
                          setNewMember({...newMember, role: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">头像URL</label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.avatarUrl : newMember.avatarUrl}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({...editingMember, avatarUrl: e.target.value});
                        } else {
                          setNewMember({...newMember, avatarUrl: e.target.value});
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 text-sm font-medium">简介</label>
                    <textarea
                      value={editingMember ? editingMember.bio : newMember.bio}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({...editingMember, bio: e.target.value});
                        } else {
                          setNewMember({...newMember, bio: e.target.value});
                        }
                      }}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-12 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    {editingMember ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleEditMember}
                          className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                        >
                          保存修改
                        </button>
                        <button
                          onClick={() => setEditingMember(null)}
                          className="w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <i className="fa-solid fa-times"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddMember}
                        className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white py-3 rounded-full transition-all duration-300 font-medium"
                      >
                        添加成员
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