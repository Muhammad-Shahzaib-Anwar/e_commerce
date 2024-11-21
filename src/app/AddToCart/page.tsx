"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Using useSearchParams from Next.js
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

type WatchType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Fetch a specific watch by ID
async function fetchWatchById(id: string | null): Promise<WatchType | null> {
  if (!id) return null; // Handle the case where id is null
  return client.fetch(`*[_type == "watch" && _id == $id][0]`, { id });
}

function AddToCart() {
  const searchParams = useSearchParams();
  const watchIdFromUrl = searchParams.get("watchid"); // Get watchid from URL
  const [currentWatch, setCurrentWatch] = useState<WatchType | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // State for quantity

  // Fetch the watch details when watchId changes
  useEffect(() => {
    if (watchIdFromUrl) {
      fetchWatchById(watchIdFromUrl).then((watch) => setCurrentWatch(watch));
    }
  }, [watchIdFromUrl]);

  if (!currentWatch) return <div>Loading...</div>; // Show a loading state if no watch is fetched

  // Calculate the total price
  const totalPrice = currentWatch.price * quantity;

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    // Dispatch a custom event with the quantity to update the cart count
    const event = new CustomEvent("cartUpdated", { detail: quantity });
    window.dispatchEvent(event);
  };

  return (
    <div className="flex items-center justify-center my-[70px]">
      <div className="basis-1/2 flex justify-center items-center">
        <Image
          src={urlFor(currentWatch.image).url()}
          alt={currentWatch.title}
          width={500}
          height={500}
        />
      </div>
      <div className="basis-1/2 flex flex-col justify-center items-start">
        <h3 className="text-base font-semibold">{currentWatch.title}</h3>
        <p className="text-xs font-light">{currentWatch.description}</p>
        <p className="text-sm font-light mt-[10px]">Rs. {currentWatch.price}</p>

        {/* Quantity Input */}
        <label className="mt-[10px]">
          Quantity:{" "}
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity state
            className="border border-black px-2 py-1"
          />
        </label>

        {/* Total Price */}
        <p className="text-sm font-light mt-[10px]">
          Total Price: <span>Rs. {totalPrice}</span>
        </p>

        <Button
          onClick={handleAddToCart}
          className="my-[10px] min-w-[150px]"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default function AddToCartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddToCart />
    </Suspense>
  );
}
