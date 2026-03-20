import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { homepageCategories } from "@/data/menuData";

const CategorySection = () => {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-5xl text-foreground mb-10 text-center"
      >
        EXPLORE <span className="text-gradient">CATEGORIES</span>
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {homepageCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/menu?category=${cat.id}`} className="group block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-all duration-300 group-hover:glow-red" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
