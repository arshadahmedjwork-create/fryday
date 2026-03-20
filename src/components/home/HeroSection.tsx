import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBurger from "@/assets/hero-burger.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="relative w-full px-4 md:px-8 lg:px-12 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-20">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-foreground">
            SAVORY &<br />
            <span className="text-gradient">CHAOTIC</span><br />
            CRAVINGS
          </h1>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
            Bold burgers, loaded fries, and global street flavors crafted for ultimate indulgence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-primary text-primary-foreground font-heading text-lg rounded-lg glow-red hover:opacity-90 transition-opacity"
              >
                Explore Menu
              </motion.button>
            </Link>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary text-primary font-heading text-lg rounded-2xl shadow-sm hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Order Now
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[80%] h-[80%] rounded-full bg-primary/20 blur-[80px]" />
          <motion.img
            src={heroBurger}
            alt="FRYDAY Signature Burger"
            className="relative w-[90%] max-w-[550px] lg:max-w-[700px] drop-shadow-2xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
