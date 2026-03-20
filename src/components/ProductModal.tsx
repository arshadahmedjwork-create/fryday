import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/data/menuData";
import { dips, toppings } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const ProductModal = ({ item, onClose }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const { addItem } = useCart();

  if (!item) return null;

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item, selectedAddons);
    }
    onClose();
    setQuantity(1);
    setSelectedAddons([]);
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-card rounded-2xl z-[90] overflow-y-auto max-h-[90vh] border border-border"
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-secondary rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square w-full bg-secondary overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className="font-heading text-3xl text-foreground">{item.name}</h2>
                <p className="text-primary font-heading text-2xl mt-1">₹{item.price}</p>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Add Dips</h3>
                <div className="flex flex-wrap gap-2">
                  {dips.map((dip) => (
                    <button
                      key={dip}
                      onClick={() => toggleAddon(dip)}
                      className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                        selectedAddons.includes(dip)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {dip}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground mb-3">Add Toppings</h3>
                <div className="flex flex-wrap gap-2">
                  {toppings.map((topping) => (
                    <button
                      key={topping}
                      onClick={() => toggleAddon(topping)}
                      className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${
                        selectedAddons.includes(topping)
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {topping}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted-foreground hover:text-foreground">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-heading text-xl w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-muted-foreground hover:text-foreground">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-gradient-primary text-primary-foreground font-heading text-lg rounded-lg hover:opacity-90 transition-opacity glow-red"
                >
                  Add to Cart — ₹{item.price * quantity}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
