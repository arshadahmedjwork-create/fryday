import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

const MobileNav = () => {
  const location = useLocation();
  const { setIsOpen, itemCount } = useCart();

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
    { to: "#cart", icon: ShoppingBag, label: "Cart", action: () => setIsOpen(true) },
    { to: "/about", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.to !== "#cart" && location.pathname === link.to;

          if (link.action) {
            return (
              <button
                key={link.label}
                onClick={link.action}
                className="flex flex-col items-center gap-1 relative py-2 px-3"
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground">{link.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
