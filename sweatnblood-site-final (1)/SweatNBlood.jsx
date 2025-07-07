import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `SweatNBlood Item #${i + 1}`,
  price: 29.99 + (i % 5) * 10,
  image: `/images/${i + 1}.jpg`,
}));

export default function SweatNBlood() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("English");

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const checkoutUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=youremail@example.com&currency_code=USD&amount=${total}&item_name=Order%20from%20SweatNBlood`;
  const momoMessage = encodeURIComponent(`Hi, I'd like to pay for my SweatNBlood order (Total: $${total}) via MTN/Orange Mobile Money.`);
  const momoLink = `https://wa.me/237XXXXXXXXX?text=${momoMessage}`;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const languageOptions = ["English", "French", "Spanish", "German", "Korean"];

  return (
    <div className="min-h-screen bg-zinc-100 p-6 relative">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <header className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/snb-logo.png" alt="SweatNBlood Logo" className="h-12 w-auto" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-xl border border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-gray-900 text-center">SweatNBlood</h1>
          <p className="text-lg text-gray-700 italic text-center">His Blood made us Stronger and Better.</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-xl border p-2 shadow-sm"
          >
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <Button variant="ghost" title="Profile" onClick={() => setShowProfile(!showProfile)}>
            <img src="/classic-icons/user.png" alt="User" className="h-6 w-6" />
          </Button>
          <Button variant="ghost" title="Settings" onClick={() => setShowSettings(!showSettings)}>
            <img src="/classic-icons/settings.png" alt="Settings" className="h-6 w-6" />
          </Button>
          <Button variant="ghost" title="Help" onClick={() => setShowHelp(!showHelp)}>
            <img src="/classic-icons/help.png" alt="Help" className="h-6 w-6" />
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" /> Cart ({cart.length})
          </Button>
        </div>
      </header>

      {showProfile && <div className="absolute top-20 right-40 bg-white shadow-md p-4 rounded-xl text-sm">User profile panel</div>}
      {showSettings && <div className="absolute top-20 right-28 bg-white shadow-md p-4 rounded-xl text-sm">Settings panel</div>}
      {showHelp && <div className="absolute top-20 right-16 bg-white shadow-md p-4 rounded-xl text-sm">Help and support</div>}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <Button className="mt-4 w-full" onClick={() => addToCart(product)}>
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-xl z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <Button variant="ghost" onClick={() => setCartOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <div className="mt-4 text-lg font-bold">
                Total: ${total}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    Pay with PayPal
                  </Button>
                </a>
                <a href={momoLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    Pay via Mobile Money (WhatsApp)
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 text-center text-gray-500">
        <p>© 2025 SweatNBlood. All rights reserved.</p>
      </footer>
    </div>
  );
}
