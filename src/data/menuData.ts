import koreanChickenBurger from "@/assets/menu/korean-chicken-burger.png";
import nashvilleBurger from "@/assets/menu/nashville-burger.png";
import smashBeefBurger from "@/assets/menu/smash-beef-burger.png";
import vegLoadedFries from "@/assets/menu/veg-loaded-fries.png";
import koreanLoadedFries from "@/assets/menu/korean-loaded-fries.png";
import koreanWings from "@/assets/menu/korean-wings.png";
import oreoShake from "@/assets/menu/oreo-shake.png";
import classicFries from "@/assets/menu/classic-fries.png";
import wrap from "@/assets/menu/wrap.png";
import chickenPops from "@/assets/menu/chicken-pops.png";
import softy from "@/assets/menu/softy.png";
import drink from "@/assets/menu/drink.png";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  addons: string[];
}

const categoryImages: Record<string, string> = {
  quickies: classicFries,
  pops: chickenPops,
  "mini-burgers": koreanChickenBurger,
  wings: koreanWings,
  wraps: wrap,
  burgers: smashBeefBurger,
  "mojitos-drinks": drink,
  shakes: oreoShake,
  softy: softy,
  "softy-tub": softy,
  "add-dips": classicFries,
  "add-toppings": oreoShake,
};

function getImage(category: string, name: string): string {
  if (name.toLowerCase().includes("korean") && name.toLowerCase().includes("burger")) return koreanChickenBurger;
  if (name.toLowerCase().includes("nashville") && name.toLowerCase().includes("burger")) return nashvilleBurger;
  if (name.toLowerCase().includes("smash") || name.toLowerCase().includes("beef burger")) return smashBeefBurger;
  if (name.toLowerCase().includes("loaded fries") && name.toLowerCase().includes("korean")) return koreanLoadedFries;
  if (name.toLowerCase().includes("loaded fries")) return vegLoadedFries;
  if (name.toLowerCase().includes("wing")) return koreanWings;
  if (name.toLowerCase().includes("shake") || name.toLowerCase().includes("float")) return oreoShake;
  if (name.toLowerCase().includes("wrap") || name.toLowerCase().includes("chipotle") || name.toLowerCase().includes("habanero") || name.toLowerCase().includes("ghost") || name.toLowerCase().includes("sizzle") || name.toLowerCase().includes("gochu")) return wrap;
  if (name.toLowerCase().includes("pops") || name.toLowerCase().includes("pop")) return chickenPops;
  if (name.toLowerCase().includes("softy") || name.toLowerCase().includes("vanilla") || name.toLowerCase().includes("chocolate") || name.toLowerCase().includes("chocovanilla")) return softy;
  if (name.toLowerCase().includes("mojito") || name.toLowerCase().includes("boom") || name.toLowerCase().includes("cool blue") || name.toLowerCase().includes("vellikizhamai") || name.toLowerCase().includes("water")) return drink;
  return categoryImages[category] || classicFries;
}

let idCounter = 0;
function createItem(name: string, category: string, price: number): MenuItem {
  idCounter++;
  return { id: `item-${idCounter}`, name, category, image: getImage(category, name), price };
}

export const categories = [
  { id: "quickies", label: "Quickies" },
  { id: "pops", label: "Pops" },
  { id: "mini-burgers", label: "Mini Burgers" },
  { id: "wings", label: "Wings" },
  { id: "wraps", label: "Wraps" },
  { id: "burgers", label: "Burgers" },
  { id: "mojitos-drinks", label: "Drinks" },
  { id: "shakes", label: "Shakes" },
  { id: "softy", label: "Softy" },
  { id: "softy-tub", label: "Softy Tub" },
  { id: "add-dips", label: "Dips" },
  { id: "add-toppings", label: "Toppings" },
];

export const menuItems: MenuItem[] = [
  // Quickies
  createItem("Classic Crispy Fries", "quickies", 99),
  createItem("Peri Peri Fries", "quickies", 129),
  createItem("Cheesy Fries", "quickies", 149),
  createItem("Veg Loaded Fries", "quickies", 179),
  createItem("Korean Chicken Loaded Fries", "quickies", 229),
  createItem("Nashville Chicken Loaded Fries", "quickies", 229),
  createItem("Cheesy Chicken Loaded Fries", "quickies", 229),
  createItem("Beef Loaded Fries", "quickies", 249),

  // Pops
  createItem("Potato Cheese Pops", "pops", 149),
  createItem("K-Pop (Korean Chicken Pops)", "pops", 199),
  createItem("Nashville Chicken Pops", "pops", 199),
  createItem("Cheesy Chicken Pops", "pops", 199),
  createItem("Thank God It's Fryday (TGIF) Pops", "pops", 219),

  // Mini Burgers
  createItem("Korean Chicken Burger", "mini-burgers", 149),
  createItem("Fryday Night Smackdown", "mini-burgers", 149),
  createItem("Nashville Burger", "mini-burgers", 149),
  createItem("Beef Burger", "mini-burgers", 179),

  // Wings
  createItem("Korean Wings", "wings", 249),
  createItem("Nashville Wings", "wings", 249),
  createItem("The Good Fryday", "wings", 269),

  // Wraps
  createItem("Korean Chicken", "wraps", 179),
  createItem("Fryday Wrap Up", "wraps", 179),
  createItem("Nashville", "wraps", 179),
  createItem("Smoky Chipotle", "wraps", 179),
  createItem("Gochu Jjang (Spicy Korean)", "wraps", 199),
  createItem("Mango Habanero", "wraps", 199),
  createItem("South East Sizzle", "wraps", 199),
  createItem("Ghost (Naga Jolokia)", "wraps", 219),

  // Burgers
  createItem("Veg Burger", "burgers", 149),
  createItem("Paneer Burger", "burgers", 169),
  createItem("Korean Chicken Burger", "burgers", 199),
  createItem("Spicy Korean Chicken Burger", "burgers", 219),
  createItem("Fryday Night Smackdown", "burgers", 229),
  createItem("Nashville Burger", "burgers", 219),
  createItem("Smash Beef Burger", "burgers", 249),
  createItem("Millionaire Burger", "burgers", 349),

  // Mojitos & Drinks
  createItem("Water", "mojitos-drinks", 20),
  createItem("Boom Boom (Bubblegum Flavor)", "mojitos-drinks", 99),
  createItem("Cool Blue (Blue Curacao)", "mojitos-drinks", 99),
  createItem("Vellikizhamai (Mint)", "mojitos-drinks", 99),

  // Shakes
  createItem("Coke Float", "shakes", 129),
  createItem("Oreo Thicc Shake", "shakes", 179),
  createItem("Milo Shake", "shakes", 179),
  createItem("Biscoff Thicc Shake", "shakes", 199),

  // Softy
  createItem("Vanilla", "softy", 69),
  createItem("Chocolate", "softy", 69),
  createItem("Chocovanilla", "softy", 79),

  // Softy Tub
  createItem("Softy Tub", "softy-tub", 99),

  // Add Dips
  createItem("Fryday Sauce", "add-dips", 29),
  createItem("Cheese Sauce", "add-dips", 39),

  // Add Toppings
  createItem("Chocochips", "add-toppings", 29),
  createItem("Chocosyrup", "add-toppings", 29),
  createItem("Gone Mad", "add-toppings", 39),
  createItem("Oreo", "add-toppings", 39),
  createItem("Cone Crumbs", "add-toppings", 29),
  createItem("KitKat", "add-toppings", 49),
  createItem("Biscoff", "add-toppings", 49),
  createItem("Milo", "add-toppings", 39),
];

export const dips = ["Fryday Sauce", "Cheese Sauce"];
export const toppings = ["Chocochips", "Chocosyrup", "Gone Mad", "Oreo", "Cone Crumbs", "KitKat", "Biscoff", "Milo"];

export const homepageCategories = [
  { id: "burgers", name: "Burgers", image: smashBeefBurger },
  { id: "quickies", name: "Fries", image: classicFries },
  { id: "wings", name: "Wings", image: koreanWings },
  { id: "wraps", name: "Wraps", image: wrap },
  { id: "pops", name: "Pops", image: chickenPops },
  { id: "mojitos-drinks", name: "Drinks", image: drink },
  { id: "shakes", name: "Shakes", image: oreoShake },
  { id: "softy", name: "Softy", image: softy },
];

export const trendingItems = [
  menuItems.find(i => i.name === "Korean Chicken Burger" && i.category === "mini-burgers")!,
  menuItems.find(i => i.name === "Nashville Burger" && i.category === "mini-burgers")!,
  menuItems.find(i => i.name === "Smash Beef Burger")!,
  menuItems.find(i => i.name === "Veg Loaded Fries")!,
  menuItems.find(i => i.name === "Korean Chicken Loaded Fries")!,
];
