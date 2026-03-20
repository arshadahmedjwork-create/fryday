import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { trendingItems } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

const TrendingSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl text-foreground"
        >
          TRENDING <span className="text-gradient">NOW</span>
        </motion.h2>
        <div className="hidden md:flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 bg-secondary rounded-full hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 bg-secondary rounded-full hover:bg-muted transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
        {trendingItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="flex-shrink-0 w-[260px] md:w-[300px] bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="aspect-square overflow-hidden bg-secondary relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-body font-semibold text-foreground">{item.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-primary font-heading text-xl">₹{item.price}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addItem(item)}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-dark transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
