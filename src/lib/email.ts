import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONFIRM_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM_ID;
const READY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_READY_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize the SDK directly
emailjs.init({
  publicKey: PUBLIC_KEY,
});

/**
 * Triggers the "Order Confirmation" email upon a successful cart checkout.
 */
export const sendOrderConfirmation = async (
  customerEmail: string,
  customerName: string,
  orderId: string,
  displayId: number,
  totalAmount: number,
  items: any[],
) => {
  const itemsHtml = items.map(
    (item) => `<li>${item.quantity}x ${item.name} ${item.addons?.length ? `(+ ${item.addons.join(", ")})` : ""} - ₹${item.price * item.quantity}</li>`
  ).join("");

  const invoiceLink = `${window.location.origin}/invoice/${orderId}`;

  return await emailjs.send(SERVICE_ID, CONFIRM_TEMPLATE_ID, {
    customer_email: customerEmail,
    customer_name: customerName,
    to_email: customerEmail,
    to_name: customerName,
    order_id: orderId.split('-')[0].toUpperCase(),
    display_id: displayId,
    total_amount: totalAmount,
    items_html: itemsHtml,
    invoice_link: invoiceLink
  });
};

/**
 * Triggers the "Order Ready" collection email when the Admin marks the order state.
 */
export const sendOrderReady = async (
  customerEmail: string,
  customerName: string,
  orderId: string,
  displayId: number
) => {
  return await emailjs.send(SERVICE_ID, READY_TEMPLATE_ID, {
    customer_email: customerEmail,
    customer_name: customerName,
    to_email: customerEmail,
    to_name: customerName,
    order_id: orderId.split('-')[0].toUpperCase(),
    display_id: displayId,
  });
};
