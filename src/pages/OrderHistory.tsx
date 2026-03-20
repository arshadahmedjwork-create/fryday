import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

const OrderHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data) setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="min-h-[60vh] flex justify-center items-center font-heading text-xl text-foreground">Loading your orders...</div>;
  }

  return (
    <div className="min-h-[85vh] pt-24 pb-16 px-4 md:px-8 max-w-5xl mx-auto">
      <SEO title="My Orders" noindex />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-heading mb-2 text-foreground">Order History</h1>
        <p className="text-muted-foreground mb-10 font-medium">Review your past cravings and print old invoices.</p>

        {orders.length === 0 ? (
          <div className="bg-card p-10 rounded-[2rem] border border-border text-center shadow-sm max-w-xl mx-auto mt-16">
            <h2 className="text-2xl font-heading text-foreground mb-4">No orders found</h2>
            <Link to="/menu" className="text-primary hover:text-primary/80 transition-colors font-bold flex items-center justify-center gap-2">
              Browse Menu <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, idx) => (
              <motion.div 
                key={order.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: idx * 0.05 }}
                className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-foreground text-2xl tracking-tight">#{order.customer_details?.display_id || order.id.split('-')[0].toUpperCase()}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                      order.status === 'preparing' ? 'bg-amber-500 text-white border-amber-600' :
                      order.status === 'ready' ? 'bg-blue-500 text-white border-blue-600' :
                      'bg-green-500 text-white border-green-600'
                    }`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-semibold mb-1 tracking-wide">
                    {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground/70 mb-3 uppercase tracking-widest">
                    ID: {order.id.split('-')[0]}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {order.items.length} items • <span className="text-primary font-bold text-lg inline-block ml-1">₹{order.total_amount}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 max-w-md truncate font-medium">
                    {order.items.map((i:any) => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
                
                <Link 
                  to={`/invoice/${order.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-xl hover:bg-primary hover:text-primary-foreground transition-all font-bold whitespace-nowrap self-start md:self-auto border border-border hover:border-transparent shadow-sm group"
                >
                  <FileText className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  View Invoice
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderHistory;
