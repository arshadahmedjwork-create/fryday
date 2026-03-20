import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { menuItems, categories } from "@/data/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import ProductModal from "@/components/ProductModal";
import SEO from "@/components/SEO";
import type { MenuItem } from "@/data/menuData";

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Sync state when URL parameter changes externally
  useEffect(() => {
    const param = searchParams.get("category");
    if (param && param !== activeCategory) {
      setActiveCategory(param);
    } else if (!param && activeCategory !== "all") {
      setActiveCategory("all");
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSearchParams(catId === "all" ? {} : { category: catId });
  };

  const filtered = useMemo(() => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full pt-20 md:pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <SEO 
        title="Our Menu | FRYDAY"
        description="Explore the full FRYDAY menu. From our signature smash beef burgers to our world-famous loaded Korean fries."
        keywords="burger menu, loaded fries varieties, Nashville hot chicken, Korean wings menu"
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-5xl md:text-7xl text-foreground mb-8"
      >
        OUR <span className="text-gradient">MENU</span>
      </motion.h1>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-8 -mx-4 px-4">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`flex-shrink-0 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
      >
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
          >
            <MenuItemCard item={item} onViewProduct={setSelectedProduct} />
          </motion.div>
        ))}
      </motion.div>

      <ProductModal item={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Menu;
