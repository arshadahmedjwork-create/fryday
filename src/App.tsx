import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
import OrderHistory from "./pages/OrderHistory";
import Admin from "./pages/Admin";
import Queue from "./pages/Queue";
import { AuthProvider } from "@/context/AuthContext";


const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <CartDrawer />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/invoice/:orderId" element={<Invoice />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav />
        </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
