import { motion } from 'framer-motion';
import { staffMembers } from '@/mock/staffData';

export function StaffSection() {
  return (
    <section id="staff" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-4">管理团队</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            认识我们的服务器管理团队，他们致力于提供最佳的游戏体验
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((member) => (
            <motion.div 
              key={member.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-16 p-6 text-center border border-gray-200 transition-all duration-300 shadow-sm"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#4CAF50]">
                <img 
                  src={member.avatarUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-[#4CAF50] font-medium mb-3">{member.role}</p>
               <p className="text-gray-600 text-sm">{member.bio}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}