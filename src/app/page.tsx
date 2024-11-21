"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";

type WatchType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

// Fetch data from Sanity (server-side)
async function fetchWatches(): Promise<WatchType[]> {
  return client.fetch(`*[_type=="watch"]`);
}

export default function Home() {
  const [watches, setWatches] = useState<WatchType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category"); // Read the category from the query string

  // Filter watches based on the category
  const filteredWatches = watches.filter((watch) =>
    !category || category === "all" ? true : watch.category === category
  );

  // Get random watches for the slider
  const randomWatches = watches.sort(() => Math.random() - Math.random()).slice(0, 5);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWatches();
      setWatches(data);
    };
    loadData();
  }, []);

  // Slider logic: Only active on the landing page (no query string)
  useEffect(() => {
    if (!category) {
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % randomWatches.length);
      }, 2000); // Change slide every 2 seconds
      return () => clearInterval(intervalId); // Clear interval on cleanup
    }
  }, [randomWatches, category]);

  

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + randomWatches.length) % randomWatches.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % randomWatches.length);
  };

  return (
    <div className="text-blue-950">
      

      {/* Main Section */}
      <div className="p-[70px]">
        {!category ? (
          // Landing Page Features (Slider)
          <div>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome to WatchIT</h1>
            <p className="text-center text-gray-600 mb-4">
              Tells more than time. Discover the finest watches for men, women, and kids.
            </p>

            {/* Image Slider */}
            <div className="relative mb-8">
              <div className="flex overflow-hidden justify-center items-center">
                {/* Slider Images */}
                {randomWatches.map((watch, index) => (
                  <div
                    key={watch._id}
                    className={`transition-all duration-500 ease-in-out ${
                      index === currentSlide ? "block" : "hidden"
                    }`}
                  >
                    <Image
                      src={urlFor(watch.image).url()}
                      alt={watch.title}
                      width={500}
                      height={500}
                      className="rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all"
                      onClick={() => {
                        router.push(`/?category=${watch.category}#${watch._id}`);
                      }}
                    />
                  </div>
                ))}
              </div>
              {/* Manual Controls */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &#10094;
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &#10095;
              </button>
            </div>
          </div>
        ) : (
          // Filtered Products
          <div className="flex flex-wrap">
            {filteredWatches.map((watch) => (
              <div key={watch._id} className="basis-1/3 p-[20px] " id={watch._id} >
                <div className="border-2 border-grey rounded shadow-md p-[20px] flex flex-col items-center justify-center cursor-pointer" onClick={()=>{router.push(`/AddToCart?watchid=${watch._id}`)}}>
                  <Image
                    src={urlFor(watch.image).url()}
                    alt={watch.title}
                    width={300}
                    height={300}
                  />
                  <h3 className="text-base font-semibold">{watch.title}</h3>
                  <p className="text-xs font-light">{watch.description}</p>
                  <p className="text-sm font-light mt-[10px]">Rs. {watch.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
