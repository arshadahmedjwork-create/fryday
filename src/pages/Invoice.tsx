import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Printer, ArrowLeft } from "lucide-react";

const Invoice = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error: any) {
        toast.error("Failed to load invoice details.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-heading text-xl text-foreground">Loading Invoice Details...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-heading text-foreground">Invoice not found</h2>
        <Link to="/" className="text-primary hover:underline font-semibold">Return Home</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-16 px-4 print:pt-12 print:px-8 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto">
        {/* Screen Only Controls */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity glow-red font-semibold"
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-card print:bg-white p-8 sm:p-12 rounded-2xl border border-border print:border-none print:shadow-none shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-border print:border-gray-200 pb-8 mb-8">
            <div className="flex items-center gap-4">
              <img src="/favicon.png" alt="FRYDAY Logo" className="w-16 h-16 object-contain" />
              <div>
                <h1 className="text-3xl font-heading text-primary print:text-red-600 tracking-tight">FRYDAY</h1>
                <p className="text-sm text-muted-foreground print:text-gray-500 font-medium">Bold Flavors, Ultimate Cravings</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <h2 className="text-2xl font-heading text-foreground print:text-black mb-1 tracking-wider">INVOICE</h2>
              <p className="text-2xl font-bold text-primary print:text-black">Order #{order.customer_details.display_id || order.id.split('-')[0].toUpperCase()}</p>
              <p className="text-xs text-muted-foreground print:text-gray-500 mt-1 uppercase tracking-widest font-mono">ID: {order.id.split('-')[0]}</p>
              <p className="text-sm text-muted-foreground print:text-gray-500 mt-2 font-medium">{formattedDate}</p>
            </div>
          </div>

          {/* Customer & Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xs font-bold text-muted-foreground print:text-gray-500 mb-2 uppercase tracking-widest">Billed To:</h3>
              <p className="font-semibold text-foreground print:text-black text-lg">{order.customer_details.name}</p>
              <p className="text-foreground print:text-gray-700 mt-1 font-medium">{order.customer_details.address}</p>
              <p className="text-foreground print:text-gray-700 font-medium">{order.customer_details.city}, {order.customer_details.zipCode}</p>
            </div>
            <div className="sm:text-right">
              <h3 className="text-xs font-bold text-muted-foreground print:text-gray-500 mb-2 uppercase tracking-widest">Order Status:</h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                order.status === 'preparing' ? 'bg-amber-500 text-white border-amber-600 print:text-black print:border-black print:bg-transparent' :
                order.status === 'ready' ? 'bg-blue-500 text-white border-blue-600 print:text-black print:border-black print:bg-transparent' :
                'bg-green-500 text-white border-green-600 print:text-black print:border-black print:bg-transparent'
              }`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-border print:border-gray-300">
                  <th className="py-3 font-semibold text-muted-foreground print:text-gray-600 uppercase text-xs tracking-wider">Item Description</th>
                  <th className="py-3 font-semibold text-muted-foreground print:text-gray-600 uppercase text-xs tracking-wider text-center">Qty</th>
                  <th className="py-3 font-semibold text-muted-foreground print:text-gray-600 uppercase text-xs tracking-wider text-right">Price</th>
                  <th className="py-3 font-semibold text-muted-foreground print:text-gray-600 uppercase text-xs tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border print:divide-gray-200">
                {order.items.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="py-5">
                      <p className="font-semibold text-foreground print:text-black">{item.name}</p>
                      {item.addons && item.addons.length > 0 && (
                        <p className="text-sm text-muted-foreground print:text-gray-500 mt-1 capitalize font-medium">
                          + {item.addons.join(", ")}
                        </p>
                      )}
                    </td>
                    <td className="py-5 text-center text-foreground print:text-black font-medium">{item.quantity}</td>
                    <td className="py-5 text-right text-foreground print:text-black font-medium">₹{item.price}</td>
                    <td className="py-5 text-right font-semibold text-foreground print:text-black">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end border-t-2 border-border print:border-gray-300 pt-6 mt-6">
            <div className="w-full sm:w-1/2 md:w-1/3">
              <div className="flex justify-between items-center px-2">
                <span className="text-lg font-bold text-foreground print:text-black">Total Paid</span>
                <span className="text-2xl font-bold font-heading text-primary print:text-red-700">₹{order.total_amount}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border print:border-gray-200 text-center">
            <p className="text-muted-foreground print:text-gray-500 font-semibold font-heading text-lg">Thank you for dining with FRYDAY!</p>
            <p className="text-xs text-muted-foreground print:text-gray-400 mt-2 font-medium">This is a system generated invoice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
