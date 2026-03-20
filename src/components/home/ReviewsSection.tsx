import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Aravind S", rating: 5, text: "Best burgers in Chennai! The Korean Chicken Burger is insane. Must try the loaded fries too 🔥" },
  { name: "Priya M", rating: 5, text: "Finally a place that does smash burgers right. The Nashville heat is no joke. Loved every bite!" },
  { name: "Rahul K", rating: 4, text: "Great ambiance and even better food. The Oreo Thicc Shake is heavenly. Will definitely come back." },
  { name: "Sneha R", rating: 5, text: "FRYDAY is our go-to weekend spot. Everything from wings to fries is packed with flavor!" },
  { name: "Karthik V", rating: 5, text: "The Millionaire Burger lives up to its name. Premium quality at a great price. Highly recommend." },
  { name: "Divya N", rating: 4, text: "Loved the Korean Wings! Perfect spice level and super crispy. The vibe of the place is amazing too." },
];

const ReviewsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="text-center mb-10 md:mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground"
        >
            Loved by Chennai
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-body text-muted-foreground mt-3 text-base"
        >
          Real reviews from our customers
        </motion.p>
        <motion.a
          href="https://www.google.com/search?q=FRYDAY+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-block mt-2 font-body text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          See all reviews on Google →
        </motion.a>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="min-w-[280px] snap-start bg-card rounded-xl p-6 border border-border hover:shadow-[0_0_20px_hsl(0_100%_56%/0.15)] transition-shadow flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-heading text-primary text-sm">
                {review.name.charAt(0)}
              </div>
              <span className="font-body text-sm font-medium text-foreground">
                {review.name}
              </span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                    }`}
                />
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {review.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
