import { Link } from "react-router-dom";
import logo from "@/assets/fryday-logo-full.png";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Footer = () => {
  const today = new Date().getDay();

  return (
    <footer className="w-full border-t border-border bg-[hsl(0,0%,6.7%)] py-12 md:py-16 px-4 md:px-8 lg:px-12 mb-16 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <img src={logo} alt="FRYDAY" className="h-16 w-auto" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
            Where bold flavors meet ultimate cravings.
          </p>
        </div>

        {/* Column 2: Location & Map */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg text-primary">Location</h3>
          <address className="font-body text-sm text-muted-foreground not-italic leading-relaxed">
            FRYDAY<br />
            9, 4th Main Rd,<br />
            Tiruvalluvar Nagar,<br />
            Besant Nagar, Chennai,<br />
            Tamil Nadu 600090
          </address>
          <div className="w-full h-[200px] rounded-lg overflow-hidden border border-border">
            <iframe
              title="FRYDAY Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.7!2d80.267!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA4MMKwMTYnMDIuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&q=FRYDAY+Besant+Nagar+Chennai"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Column 3: Working Hours */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg text-primary">Working Hours</h3>
          <ul className="font-body text-sm space-y-2">
            {days.map((day, index) => (
              <li
                key={day}
                className={`flex justify-between ${
                  index === today
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <span>{day}</span>
                <span>6–11 pm</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} FRYDAY. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground font-medium">
          <Link to="/admin" className="hover:text-primary transition-colors">Admin Portal</Link>
          <Link to="/queue" className="hover:text-primary transition-colors">Queue Display</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
