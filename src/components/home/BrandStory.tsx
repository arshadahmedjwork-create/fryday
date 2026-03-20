import { motion } from "framer-motion";

const BrandStory = () => {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-6xl text-foreground"
        >
          OUR <span className="text-gradient">STORY</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            FRYDAY is a bold, modern fast-food brand built around one simple idea — great food, high flavor, and unforgettable cravings.
          </p>
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            From smash burgers to loaded fries and globally inspired flavors like Korean spice and Nashville heat, every bite is crafted to deliver indulgence and satisfaction.
          </p>
          <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
            Designed for the next generation of food lovers, FRYDAY is more than a meal — it's a craving.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
