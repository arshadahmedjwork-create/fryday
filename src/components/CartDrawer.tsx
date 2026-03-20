import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCheckout = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-2xl">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p className="font-heading text-xl">Cart is empty</p>
                  <p className="text-sm mt-2">Add some items to get started</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id + item.addons.join(",")}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 bg-secondary rounded-lg p-3"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-semibold text-sm text-foreground truncate">{item.name}</h4>
                      {item.addons.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.addons.join(", ")}</p>
                      )}
                      <p className="text-primary font-semibold text-sm mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-primary transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-background rounded-md">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-heading text-2xl text-foreground">₹{total}</span>
                </div>
                <button onClick={handleCheckout} className="w-full py-4 bg-gradient-primary text-primary-foreground font-heading text-lg rounded-lg hover:opacity-90 transition-opacity glow-red">
                  Checkout
                </button>
                <button onClick={clearCart} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
