import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import profileImage from 'figma:asset/82d482b1df28e298b269abc01a39cd515e1f7e77.png';

export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-[1.5fr_1fr] gap-16 items-center"
        >
          <div className="space-y-6">
            <h2 className="mb-8">About</h2>
            <p className="text-gray-600 leading-relaxed">
              2007年頃はガラケーのWebサイト制作を担当し、その後のスマホシフトに合わせて、多様なアプリのUIデザインに携わってきました。施策の企画段階から関わるケースもあります。使いやすさやKPI達成に加えて、実装のしやすさや長期的な運用を見据えた安定性・保守性まで含めたUI設計を大切にしています。
            </p>       
            <div className="pt-8 space-y-4">
              <div>
                <h4 className="mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {['UI/UXデザイン', 'ビジュアルデザイン', 'デザインシステム', 'ブランディング', 'イラストレーション', '企画'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 border border-gray-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square bg-gray-100 max-w-xs mx-auto rounded-full overflow-hidden"
          >
            <img
              src={profileImage}
              alt="MARIKO KO"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}