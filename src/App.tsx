import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import DonationPage from "@/pages/DonationPage";
import AnnouncementsPage from "@/news/pages/AnnouncementsPage";
import AnnouncementDetailPage from "@/news/pages/AnnouncementDetailPage";
import DonorThanksPage from "@/pages/DonorThanksPage";
import CommandsPage from "@/pages/CommandsPage";
import BanListPage from "@/pages/BanListPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AnnouncementEditor from "@/pages/admin/AnnouncementEditor";
import StaffEditor from "@/pages/admin/StaffEditor";
import GalleryEditor from "@/pages/admin/GalleryEditor";
import DonorEditor from "@/pages/admin/DonorEditor";
import PasswordEditor from "@/pages/admin/PasswordEditor";

/**
 * 应用程序主组件
 * 配置并定义所有路由规则
 */
export default function App() {
  return (
    <Routes>
      {/* 首页路由 */}
      <Route path="/" element={<Home />} />
      
      {/* 捐赠页面路由 */}
      <Route path="/donate" element={<DonationPage />} />
      
       {/* 指令页面路由 */}
       <Route path="/commands" element={<CommandsPage />} />
       
       {/* 封禁名单页面路由 */}
       <Route path="/ban-list" element={<BanListPage />} />
      
      {/* 公告列表页面路由 */}
      <Route path="/announcements" element={<AnnouncementsPage />} />
      
      {/* 公告详情页面路由 - 带参数id */}
      <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
      
      {/* 捐赠感谢页面路由 */}
      <Route path="/donor-thanks" element={<DonorThanksPage />} />
      
      {/* 管理员后台路由 */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/announcements" element={<AnnouncementEditor />} />
      <Route path="/admin/staff" element={<StaffEditor />} />
      <Route path="/admin/gallery" element={<GalleryEditor />} />
       <Route path="/admin/donors" element={<DonorEditor />} />
       <Route path="/admin/password" element={<PasswordEditor />} />
      
      {/* 其他页面路由 - 即将推出 */}
      <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
    </Routes>
  );
}