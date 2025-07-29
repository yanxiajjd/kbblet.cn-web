import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi } from '@/services/adminApi';

// 定义认证上下文类型
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 认证提供者组件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 检查本地存储中的认证状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 这里我们仍然使用localStorage来记住登录状态，但密码验证将通过API进行
        const savedAuth = localStorage.getItem('isAuthenticated');
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // 登录函数 - 验证密码
  const login = async (password: string): Promise<boolean> => {
    try {
      const isValid = await authApi.verifyPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };
  
  // 更新密码函数
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // 验证当前密码
      const isValid = await authApi.verifyPassword(currentPassword);
      if (!isValid) {
        return false; // 当前密码不正确
      }
      
      if (!newPassword || newPassword.length < 6) {
        return false; // 新密码太短
      }
      
      // 通过API更新密码
      await authApi.updatePassword(newPassword);
      return true;
    } catch (error) {
      console.error('Failed to update password:', error);
      return false;
    }
  };
  
  // 登出函数
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自定义Hook - 使用认证上下文
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}