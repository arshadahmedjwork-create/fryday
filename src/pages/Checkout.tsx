import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { sendOrderConfirmation } from "@/lib/email";
import SEO from "@/components/SEO";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to checkout.");
      navigate("/auth");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/menu");
      return;
    }

    setLoading(true);

    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from("orders")
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfDay.toISOString());
      
      const displayId = (count || 0) + 1;

      const newOrder = {
        user_id: user.id,
        total_amount: total,
        items,
        customer_details: {
          name: user.email?.split('@')[0] || "Customer",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
          display_id: displayId,
        },
        status: "preparing",
      };

      const { data, error } = await supabase
        .from("orders")
        .insert(newOrder)
        .select()
        .single();

      if (error) throw error;

      if (user.email) {
        sendOrderConfirmation(
          user.email,
          newOrder.customer_details.name,
          data.id,
          displayId,
          total,
          items
        ).catch(console.error); // Do not block checkout if email somehow fails
      }

      toast.success("Payment successful! Order placed.");
      clearCart();
      setIsModalOpen(false);
      navigate(`/invoice/${data.id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to place order.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-[80vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-heading mb-4 text-foreground">Your cart is empty</h2>
        <button onClick={() => navigate("/menu")} className="text-primary hover:underline font-semibold">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
      <SEO title="Secure Checkout" noindex />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-sm">
        <h1 className="text-4xl font-heading mb-8 text-foreground text-center">Order Summary</h1>
        
        <div className="space-y-4 mb-8 max-h-[50vh] overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={`${item.id}-${item.addons.join("-")}`} className="flex justify-between items-center bg-background p-4 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                <div>
                  <p className="font-bold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 font-medium">Qty: {item.quantity}</p>
                  {item.addons.length > 0 && <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate capitalize">+ {item.addons.join(", ")}</p>}
                </div>
              </div>
              <p className="font-bold text-primary text-lg">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-6 flex justify-between items-center text-xl font-heading mb-8">
          <span className="text-foreground">Total to Pay</span>
          <span className="text-primary text-3xl">₹{total}</span>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 bg-primary text-primary-foreground font-heading text-xl rounded-xl hover:opacity-90 glow-red transition-all hover:scale-[1.02]"
        >
          Proceed to Pay ₹{total}
        </button>
      </motion.div>

      {/* QIQ Pay Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !loading && setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md max-h-[90vh] bg-white text-black z-10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-violet-600 text-white p-6 relative">
                <button onClick={() => !loading && setIsModalOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <h2 className="text-3xl font-heading tracking-tight italic drop-shadow-sm">QIQ Pay</h2>
                  <p className="text-violet-200 text-sm font-medium mt-1">Fast & Secure Payments</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    {["upi", "card", "netbanking"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all duration-200 ${paymentMethod === method ? "bg-white text-violet-700 shadow-sm ring-1 ring-black/5" : "text-gray-500 hover:text-black"}`}
                      >
                        {method === "upi" ? "UPI Setup" : method === "card" ? "Debit/Credit" : "Net Banking"}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[160px]">
                    {paymentMethod === "upi" && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <p className="text-sm font-bold text-black">Select UPI App</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-700 hover:border-violet-500 hover:text-violet-700 cursor-pointer transition-colors shadow-sm">GPay</div>
                          <div className="h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-700 hover:border-violet-500 hover:text-violet-700 cursor-pointer transition-colors shadow-sm">PhonePe</div>
                          <div className="h-14 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-700 hover:border-violet-500 hover:text-violet-700 cursor-pointer transition-colors shadow-sm">Paytm</div>
                        </div>
                        <div className="relative flex items-center py-2">
                          <div className="flex-grow border-t border-gray-200"></div>
                          <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">OR</span>
                          <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                        <input placeholder="Enter UPI ID (e.g. name@okhdfc)" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none text-black font-semibold transition-all placeholder:text-gray-400" />
                      </motion.div>
                    )}

                    {paymentMethod === "card" && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <input placeholder="Card Number" maxLength={16} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none text-black font-semibold transition-all placeholder:text-gray-400" />
                        <div className="grid grid-cols-2 gap-4">
                          <input placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none text-black font-semibold transition-all placeholder:text-gray-400" />
                          <input type="password" placeholder="CVV" maxLength={4} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:outline-none text-black font-semibold transition-all placeholder:text-gray-400" />
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="pt-2">
                        <div className="text-sm text-gray-600 text-center py-10 bg-gray-50 border border-gray-200 rounded-xl font-medium shadow-sm">
                          Select your bank securely on the next step.
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-4 bg-violet-600 text-white font-heading tracking-wide text-xl rounded-xl hover:bg-violet-700 disabled:opacity-50 mt-2 transition-all hover:scale-[1.02] shadow-lg shadow-violet-600/20">
                    {loading ? "Processing..." : `Pay ₹${total}`}
                  </button>
                  <p className="text-center text-xs text-gray-400 font-medium">Secured by QIQ Pay Encryption</p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
