import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, LogOut, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/fryday-logo-icon.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const { setIsOpen, itemCount } = useCart();
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="w-full px-4 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="FRYDAY" className="h-10 md:h-12 w-auto" />
          <span className="font-heading text-2xl md:text-3xl text-foreground">FRYDAY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4 mr-2 border-r border-border pr-5">
              <Link to="/orders" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border">My Orders</Link>
              <div className="w-px h-4 bg-border hidden lg:block mx-1"></div>
              <span className="text-sm font-bold text-muted-foreground flex items-center gap-1.5 cursor-default hover:text-foreground transition-colors"><UserIcon className="w-4 h-4 text-primary"/> {user.email?.split('@')[0]}</span>
              <button onClick={signOut} title="Logout" className="text-muted-foreground hover:text-red-500 transition-all hover:scale-110 ml-2 bg-muted/40 p-2 rounded-full">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center mr-2 border-r border-border pr-4">
              <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center glow-red"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
