"use client";

import { Suspense,useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react"; // Import Lucide icons

function Navigation() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // Read the category from the query string

  const [cartCount, setCartCount] = useState<number>(0); // State to track cart count

  useEffect(() => {
    // Event listener for the custom "cartUpdated" event
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<number>; // Type assertion for CustomEvent
      setCartCount((prev) => prev + 1);//customEvent.detail); // Increment cart count
    };

    // Add event listener when component mounts
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold cursor-pointer">
          WatchIT
        </Link>
      </div>

      <div className="flex space-x-6">
        {/* Navigation Buttons */}
        {["all", "men", "women", "kids"].map((cat) => (
          <Link
            key={cat}
            href={`/?category=${cat}`}
            className={`capitalize text-base ${
              (!category && cat === "all") || category === cat
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-700"
            }`}
          >
            {cat === "all" ? "All Products" : cat}
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center">
        {/* Search Icon */}
        <button>
          <Search className="w-6 h-6" />
        </button>

        {/* Cart Icon */}
        <button className="relative mr-[10px] ml-[30px]">
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function NavigationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navigation />
    </Suspense>
  );
}