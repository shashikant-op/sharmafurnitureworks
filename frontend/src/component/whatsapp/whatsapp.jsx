import React from "react";
import { FaWhatsapp } from "react-icons/fa";



const WhatsAppButton = ({ phoneno, cartitem = [] }) => {
    
const frontendlink = import.meta.env.VITE_FRONTEND_URL;
console.log(frontendlink);
  const phoneNumber = `${phoneno}`;
  console.log(cartitem);

  const generateMessage = () => {
    if (!Array.isArray(cartitem)) return encodeURIComponent("No items in cart.");

    let message = "🛒 *Order Inquiry from Sharma Furniture*:\n\n";
    cartitem?.forEach((item) => {
      message += `🔹 *${item.title}*\n`;
      message += `Qty: ${item.quantity}\n`;
      message += `Price: ₹${item.price}\n`;
      message += `Product: ${frontendlink}/product/${item.product}\n\n`;
    });
    message += "Please confirm availability and delivery details.";
    console.log(cartitem);
    return encodeURIComponent(message);
  };    

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${generateMessage()}`;

  return (
    <div className="!bg-transparent">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="!text-white flex flex-row"
      >
        Send Inquiry <FaWhatsapp className="text-white ml-3 text-2xl" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
