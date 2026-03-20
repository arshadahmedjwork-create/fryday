import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const ProfileSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.user_metadata?.phone) {
      navigate("/checkout", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { phone }
      });
      if (error) throw error;
      toast.success("Profile saved!");
      navigate("/checkout", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Complete Profile" noindex />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl border border-border mt-16 shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-heading text-foreground">Complete your profile</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Please provide your mobile number to proceed to checkout.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="text-sm font-medium mb-1 block text-foreground">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-lg text-primary-foreground bg-primary hover:opacity-90 transition-all shadow-md glow-red disabled:opacity-50 font-semibold text-lg"
          >
            {loading ? "Saving..." : "Continue to Payment"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
