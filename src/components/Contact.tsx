import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="mb-8 text-white">Let's Work Together</h2>
          <p className="text-gray-400 mb-12 text-lg">
            I'm always open to discussing new projects and opportunities.
          </p>

          <motion.a
            href="mailto:marikokoillust@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-5 h-5" />
            marikokoillust@gmail.com
          </motion.a>

          {/* SNS icons hidden as requested */}
          {/* <div className="mt-16 flex justify-center gap-8">
            {[
              { icon: Mail, href: '#', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div> */}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-24 pt-12 border-t border-gray-800"
      >
        <p className="text-gray-500 text-sm">
          © 2025 MARIKO KO. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
}