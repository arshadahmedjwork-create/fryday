import { motion } from "framer-motion";
import logo from "@/assets/fryday-logo-full.png";

const About = () => {
  return (
    <div className="w-full min-h-screen pt-20 md:pt-24 pb-20 px-4 md:px-8 lg:px-12 flex items-center">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src={logo}
          alt="FRYDAY"
          className="h-32 md:h-40 w-auto mx-auto"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl text-foreground"
        >
          ABOUT <span className="text-gradient">FRYDAY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            FRYDAY is a next-generation fast-food brand built for bold taste and big cravings.
          </p>
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            Rooted in global street food culture, we bring together Korean spice, Nashville heat, and indulgent comfort food into one unforgettable experience.
          </p>
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            Every item is crafted with signature seasoning, generous portions, and a focus on flavor-first innovation.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-heading text-2xl md:text-3xl text-gradient"
        >
          "Where bold flavors meet ultimate cravings."
        </motion.p>
      </div>
    </div>
  );
};

export default About;
