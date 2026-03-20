import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
  onViewProduct?: (item: MenuItem) => void;
}

const MenuItemCard = ({ item, onViewProduct }: MenuItemCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:glow-red cursor-pointer"
      onClick={() => onViewProduct?.(item)}
    >
      <div className="aspect-square overflow-hidden bg-secondary relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-body font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-primary font-heading text-lg">₹{item.price}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              addItem(item);
            }}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
