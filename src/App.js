import React from "react";
import { ShoppingBag } from "lucide-react";

const products = Array.from({ length: 20 }, (_, i) => ({
  name: `SweatNBlood Item #${i + 1}`,
  price: `$${(29.99 + (i % 5) * 10).toFixed(2)}`,
  image: `/images/${i + 1}.jpg`,
}));

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900">SweatNBlood</h1>
        <p className="text-lg text-gray-600">Gear that fuels your grind</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="rounded-2xl shadow-lg overflow-hidden bg-white">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-500">{product.price}</p>
              <button className="mt-4 w-full flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>

      <footer className="mt-16 text-center text-gray-500">
        <p>© 2025 SweatNBlood. All rights reserved.</p>
      </footer>
    </div>
  );
}
