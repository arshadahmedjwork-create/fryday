import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { CheckCircle, Clock } from "lucide-react";
import { sendOrderReady } from "@/lib/email";

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [tab, setTab] = useState("active");

  const activeOrders = orders.filter(o => o.status !== "delivered" && o.status !== "completed");
  const historyOrders = orders.filter(o => o.status === "delivered" || o.status === "completed");

  useEffect(() => {
    fetchOrders();
    // Using Supabase Realtime to update view instantly
    const channel = supabase.channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (!error && data) setOrders(data);
  };

  const updateStatus = async (order: any, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", order.id);
    if (error) {
      toast.error("Update failed");
    } else {
      toast.success(`Order marked as ${status}`);
      
      // Update local state immediately for instant feedback
      setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? { ...o, status } : o));

      // Actively sync the notification immediately for pickup availability
      if (status === "ready" && order.customer_details?.email) {
        toast.promise(
          sendOrderReady(order.customer_details.email, order.customer_details.name, order.id, order.customer_details.display_id),
          {
            loading: "Emailing pickup notification...",
            success: "Customer successfully emailed!",
            error: "Failed to dispatch email",
          }
        );
      }
    }
  };

  // Group to distinct customers (naively via phone number for demo)
  const customers = Array.from(new Set(orders.map(o => o.customer_details.phone))).map(phone => {
    return orders.find(o => o.customer_details.phone === phone)?.customer_details;
  }).filter(Boolean);

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto pb-16">
      <h1 className="text-4xl font-heading mb-8 text-foreground">Admin Portal</h1>
      <div className="flex gap-4 mb-8 border-b border-border pb-4">
        <button onClick={() => setTab("active")} className={`text-lg font-semibold transition-colors ${tab === "active" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>Active Orders</button>
        <button onClick={() => setTab("history")} className={`text-lg font-semibold transition-colors ${tab === "history" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>Order History</button>
        <button onClick={() => setTab("customers")} className={`text-lg font-semibold transition-colors ${tab === "customers" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}>Registered Customers</button>
      </div>

      {tab === "active" && (
        <div className="space-y-4">
          {activeOrders.length === 0 && <p className="text-muted-foreground">No active orders right now.</p>}
          {activeOrders.map(order => (
            <div key={order.id} className="bg-card p-6 rounded-xl border border-border flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm">
              <div>
                <p className="font-bold text-2xl text-foreground bg-secondary inline-block px-3 py-1 rounded mr-3 mt-1">#{order.customer_details.display_id || order.id.split('-')[0].toUpperCase()}</p>
                <span className="font-bold text-foreground text-xl">{order.customer_details.name}</span>
                <p className="text-xs font-mono text-muted-foreground mt-1 tracking-widest uppercase">ID: {order.id.split('-')[0]}</p>
                <p className="text-sm text-muted-foreground mt-2">{order.items.length} items • ₹{order.total_amount}</p>
                <div className="mt-1 text-sm text-foreground flex flex-wrap gap-2">
                  {order.items.map((i:any, x:number) => (
                    <span key={x} className="bg-background border border-border px-2 py-0.5 rounded-md text-xs">{i.quantity}x {i.name}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                  order.status === 'preparing' ? 'bg-amber-500 text-white border-amber-600 shadow-sm' :
                  order.status === 'ready' ? 'bg-blue-500 text-white border-blue-600 shadow-sm' :
                  'bg-green-500 text-white border-green-600 shadow-sm'
                }`}>{order.status}</span>

                <div className="flex gap-2">
                  {order.status === "preparing" && (
                    <button onClick={() => updateStatus(order, "ready")} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition shadow-sm">
                      <Clock className="w-4 h-4"/> Mark Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button onClick={() => updateStatus(order, "delivered")} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-semibold hover:bg-green-700 transition shadow-sm">
                      <CheckCircle className="w-4 h-4"/> Mark Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div className="space-y-4">
          {historyOrders.length === 0 && <p className="text-muted-foreground">No delivered orders yet.</p>}
          {historyOrders.map(order => (
            <div key={order.id} className="bg-card p-6 rounded-xl border border-border flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shadow-sm opacity-80">
              <div>
                <p className="font-bold text-2xl text-foreground bg-secondary inline-block px-3 py-1 rounded mr-3 mt-1">#{order.customer_details.display_id || order.id.split('-')[0].toUpperCase()}</p>
                <span className="font-bold text-foreground text-xl">{order.customer_details.name}</span>
                <p className="text-xs font-mono text-muted-foreground mt-1 tracking-widest uppercase">ID: {order.id.split('-')[0]}</p>
                <p className="text-sm text-muted-foreground mt-2">{order.items.length} items • ₹{order.total_amount}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border bg-green-500 text-white border-green-600 shadow-sm">
                  {order.status === 'completed' ? 'DELIVERED' : order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "customers" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.length === 0 && <p className="text-muted-foreground">No customers found.</p>}
          {customers.map((c:any, i) => (
            <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-bold text-xl text-foreground">{c.name}</h3>
              <p className="text-muted-foreground mt-1 font-medium">{c.phone || "No phone provided"}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground">{c.address}</p>
                <p className="text-sm text-muted-foreground">{c.city} - {c.zipCode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
