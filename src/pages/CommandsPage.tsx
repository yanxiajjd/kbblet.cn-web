import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

// 定义指令类型
interface CommandSubCategory {
  title: string;
  commands: Command[];
}

interface CommandCategory {
  title: string;
  subCategories: CommandSubCategory[];
}

interface Command {
  syntax: string;
  description: string;
}

export default function CommandsPage() {
  // 指令数据 - 根据用户提供的信息整理
  const commandCategories: CommandCategory[] = [
    {
      title: "默认权限指令",
      commands: [
        // 登录指令
        { syntax: "/reg <密码> <密码>", description: "注册账号" },
        { syntax: "/l <密码>", description: "登录" },
        
        // 传送指令
        { syntax: "/sethome <A>", description: "设置一个家并命名为<A>(最多设置三个)" },
        { syntax: "/renamehome <A> <B>", description: "将名称为<A>的家重命名为<A>" },
        { syntax: "/delhome <A>", description: "将home<A>移除" },
        { syntax: "/home <A>", description: "传送回<A>" },
        { syntax: "/homes", description: "列出所有的home" },
        { syntax: "/warp <A>", description: "传送到公共传送点" },
				{ syntax: "/spawn", description: "传送回服务器出生点" },
        { syntax: "/tpa <A>", description: "请求传送至<A>" },
        { syntax: "/tpahere <A>", description: "请求<A>传送至你" },
        { syntax: "/tpaccept", description: "接受传送请求" },
        { syntax: "/tpdeny", description: "拒绝传送请求" },
        { syntax: "/tpacancel", description: "取消你的上一个传送请求" },
        
        // 皮肤指令
        { syntax: "/skins", description: "切换皮肤" },
        
        // 查询指令
        { syntax: "/co i", description: "开启或关闭查询模式，开启此模式后右键方块可查看放置者或破坏者" }
      ]
    },
    {
      title: "管理员",
      commands: [
        // 玩家管理指令
        { syntax: "/kick <A>", description: "踢出玩家<A>" },
        { syntax: "/ban <A>", description: "封禁玩家<A>" },
        { syntax: "/banip <ip>", description: "封禁IP<ip>" },
        { syntax: "/unban <A> /unbanip <ip>", description: "解除封禁" },
        
        // 原版指令
        { syntax: "/gamemode <A>", description: "切换游戏模式，创造除外" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Header */}
      <Header />
      
      {/* Commands Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
               <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4 mt-16">服务器指令大全</h1>
             </motion.div>
             
             <div className="bg-white rounded-16 shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 md:p-8">
                {commandCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-8 last:mb-0"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center">
                      <i className="fa-solid fa-list-ul text-[#4CAF50] mr-3"></i>
                      {category.title}
                    </h2>
                    
                    {category.commands.length > 0 ? (
                      <div className="space-y-4 pl-2">
                        {category.commands.map((cmd, cmdIndex) => (
                          <div 
                            key={cmdIndex} 
                            className="bg-gray-50 rounded-12 p-4 hover:bg-gray-100 transition-colors duration-300"
                          >
                            <div className="font-mono text-[#4CAF50] mb-1">{cmd.syntax}</div>
                            <p className="text-gray-600">{cmd.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic py-4 pl-2">
                        该分类下暂无指令
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <a 
                href="/" 
                className="inline-flex items-center text-[#4CAF50] font-medium hover:underline"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                返回首页
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}