import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function DonationPage() {
  // 捐赠好处列表 - 服务器相关
  const donationBenefits = [
    {
      icon: 'fa-server',
      title: '服务器硬件升级',
      description: '提升服务器性能，支持更多玩家同时在线，减少卡顿'
    },
    {
      icon: 'fa-bolt',
      title: '带宽和网络优化',
      description: '增加服务器带宽，提升国际连接速度，降低延迟'
    },
    {
      icon: 'fa-code',
      title: '新功能和插件开发',
      description: '支持开发和购买新插件，增加游戏趣味性和功能性'
    },
    {
      icon: 'fa-shield-alt',
      title: '服务器稳定性提升',
      description: '增强服务器稳定性，减少崩溃和维护时间'
    },
    {
      icon: 'fa-calendar-alt',
      title: '社区活动支持',
      description: '资助举办更多社区活动和比赛，丰富游戏体验'
    },
    {
      icon: 'fa-trophy',
      title: '捐赠感谢名单',
      description: '您的名字将出现在捐赠感谢名单中，永久展示您对服务器的支持'
    },
    {
      icon: 'fa-database',
      title: '数据备份与安全',
      description: '实现定期数据备份和安全维护，保障玩家数据安全'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-800 mb-4">支持服务器发展</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                您的捐赠将帮助我们维护服务器运营、添加新功能和举办更多社区活动
              </p>
            </div>
            
            <div className="bg-white rounded-16 overflow-hidden shadow-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column - Donation Benefits */}
                <div className="p-8 md:p-12">
                  <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800 mb-6">通过微信支付捐赠我们</h2>
                  
                  <div className="space-y-6">
                    {donationBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] mr-4 flex-shrink-0">
                          <i className={`fa-solid ${benefit.icon} text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-10 p-6 bg-gray-50 rounded-12 border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                      <i className="fa-solid fa-info-circle text-[#4CAF50] mr-2"></i>
                      捐赠说明
                    </h3>
                    <p className="text-gray-600 text-sm">
                      所有捐赠将用于服务器维护、升级和社区活动。捐赠金额不限，任何数额的支持都将受到我们的衷心感谢！
                    </p>
                  </div>
                </div>
                
                {/* Right Column - QR Code */}
                <div className="bg-gray-50 p-8 md:p-12 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white p-6 rounded-16 shadow-lg border border-gray-200 max-w-xs w-full"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">微信扫码捐赠</h3>
                      <p className="text-gray-600 text-sm">扫描下方二维码支持我们</p>
                    </div>
                    <div className="bg-white p-4 rounded-12 border border-gray-200 mb-6">
                      <img 
                        src="https://lf-code-agent.coze.cn/obj/x-ai-cn/276483463938/attachment/111111111111_20250728123530.jpeg" 
                        alt="微信支付二维码"
                        className="w-full h-auto rounded-8"
                      />
                    </div>
                    
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">为什么需要捐赠支持？</h3>
            <p className="text-gray-600 mb-6">
              服务器运营需要持续的资金投入，包括服务器租赁、域名费用、插件购买和技术支持等。您的每一份捐赠都将直接用于提升服务器体验。
            </p>
            <a href="/" className="inline-flex items-center text-[#4CAF50] font-medium hover:underline">
              返回首页 <i className="fa-solid fa-arrow-left ml-2 text-sm"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}