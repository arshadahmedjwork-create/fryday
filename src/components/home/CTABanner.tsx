import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />

      <div className="relative text-center space-y-8">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground"
        >
          CRAVING SOMETHING<br />
          <span className="text-gradient">BOLD?</span>
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-primary text-primary-foreground font-heading text-xl rounded-[2rem] shadow-lg glow-red hover:opacity-90 transition-opacity"
            >
              Order Now
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default CTABanner;