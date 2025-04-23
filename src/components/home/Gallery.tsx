"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    src: "/images/restaurant-interior.jpg",
    alt: "Elegant dining area with soft lighting",
    caption: "Our elegant main dining area",
  },
  {
    id: 2,
    src: "/images/restaurant-table.jpg",
    alt: "Beautifully set table with fine dinnerware",
    caption: "Exquisite table settings for a perfect dining experience",
  },
  {
    id: 3,
    src: "/images/dish1.jpg",
    alt: "Gourmet dish plated beautifully",
    caption: "Our chef's signature creations",
  },
  {
    id: 4,
    src: "/images/dish3.jpg",
    alt: "Dessert with artistic presentation",
    caption: "Decadent desserts to complete your meal",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === null ? 0 : (prev + 1) % galleryImages.length
    );
  };

  const prevImage = () => {
    setSelectedImage((prev) =>
      prev === null
        ? 0
        : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Ambiance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Step into the warm and inviting atmosphere of Flavor Haven, where
            every corner tells a story of elegance and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg aspect-video cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white w-full">
                  <p className="font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
            onClick={closeLightbox}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            className="absolute left-4 text-white hover:text-amber-400 transition-colors"
            onClick={prevImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
              <p className="text-white text-center">
                {galleryImages[selectedImage].caption}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 text-white hover:text-amber-400 transition-colors"
            onClick={nextImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
