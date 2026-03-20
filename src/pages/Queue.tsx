import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function Queue() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
    const channel = supabase.channel('schema-queue-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchOrders = async () => {
    // We only care about active orders for the public facing monitor
    const { data } = await supabase.from("orders").select("*").in("status", ["preparing", "ready"]).order("created_at", { ascending: true });
    if (data) setOrders(data);
  };

  const preparing = orders.filter(o => o.status === "preparing");
  const ready = orders.filter(o => o.status === "ready");

  return (
    <div className="min-h-screen bg-background pt-24 px-4 md:px-12 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-heading text-primary tracking-tight">ORDER STATUS</h1>
        <p className="mt-2 text-muted-foreground font-medium uppercase tracking-widest text-sm">Please watch this screen for your order number</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto h-[65vh]">
        {/* Preparing Column */}
        <div className="bg-card/40 rounded-[2rem] border border-border p-8 flex flex-col items-center relative overflow-hidden shadow-[inset_0_0_100px_rgba(245,158,11,0.02)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-amber-500 rounded-t-[2rem]" />
          <h2 className="text-2xl font-bold text-amber-500 mb-8 tracking-[0.2em] uppercase relative z-10">Preparing</h2>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 auto-rows-max overflow-y-auto pr-2 pb-4 scrollbar-hide">
            <AnimatePresence>
              {preparing.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-muted-foreground py-10">No orders actively preparing</motion.p>
              )}
              {preparing.map(order => (
                <motion.div key={order.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-background border border-border rounded-2xl p-4 text-center shadow-sm flex items-center justify-center">
                  <span className="text-5xl font-bold font-heading text-foreground">#{order.customer_details.display_id || order.id.split('-')[0].toUpperCase()}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Ready Column */}
        <div className="bg-card/40 rounded-[2rem] border border-border p-8 flex flex-col items-center relative overflow-hidden shadow-[inset_0_0_100px_rgba(34,197,94,0.02)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-green-500 rounded-t-[2rem]" />
          <h2 className="text-2xl font-bold text-green-500 mb-8 tracking-[0.2em] uppercase relative z-10 text-center flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Ready for Pickup
          </h2>
          <div className="w-full grid grid-cols-2 gap-5 auto-rows-max relative z-10 overflow-y-auto pr-2 pb-4 scrollbar-hide">
            <AnimatePresence>
              {ready.length === 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center text-muted-foreground py-10">No orders waiting for pickup</motion.p>
              )}
              {ready.map(order => (
                <motion.div key={order.id} layout initial={{ opacity: 0, scale: 0.8, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-green-500 text-white rounded-2xl p-6 text-center shadow-lg transform transition-transform border border-green-400 flex items-center justify-center min-h-[100px]">
                  <span className="text-6xl sm:text-7xl font-bold font-heading tracking-wider">#{order.customer_details.display_id || order.id.split('-')[0].toUpperCase()}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
