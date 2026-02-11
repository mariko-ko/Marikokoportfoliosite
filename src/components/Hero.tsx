import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import iconImage from 'figma:asset/82d482b1df28e298b269abc01a39cd515e1f7e77.png';

export function Hero() {
  return (
    <section className="h-[70vh] flex flex-col justify-center items-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <img 
            src={iconImage} 
            alt="MARIKO KO" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
        </motion.div>
        <motion.h1
          className="mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MARIKO KO
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-4 text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          UI/UX Designer & Visual Designer
        </motion.p>
        <motion.p
          className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A curated collection of my design work from 2014 to 2025.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}