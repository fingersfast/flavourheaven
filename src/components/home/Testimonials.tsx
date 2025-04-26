"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Expanded testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    quote:
      "Flavor Haven exceeded all my expectations. The truffle risotto was the best I've ever tasted, and the service was impeccable.",
    image: "/images/testimonial1.jpg",
    rating: 5,
    date: "January 2023",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Local Resident",
    quote:
      "This has become our family's go-to spot for special occasions. The menu is diverse, and they're always accommodating with our dietary restrictions.",
    image: "/images/testimonial2.jpg",
    rating: 5,
    date: "March 2023",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Corporate Event Planner",
    quote:
      "We hosted our company dinner at Flavor Haven and it was a hit! The private dining experience was elegant, and the staff was professional and attentive.",
    image: "/images/testimonial3.jpg",
    rating: 4,
    date: "May 2023",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Food Critic",
    quote:
      "Flavor Haven brings a refreshing take on traditional cuisine. Their attention to detail in both presentation and flavor profiles is remarkable.",
    image: "/images/testimonial1.jpg", // Reusing image as placeholder
    rating: 5,
    date: "August 2023",
  },
  {
    id: 5,
    name: "Lisa Marquez",
    role: "Birthday Celebrant",
    quote:
      "Celebrated my 30th birthday here and it was magical! The chef prepared a special menu for us and every dish was outstanding.",
    image: "/images/testimonial2.jpg", // Reusing image as placeholder
    rating: 5,
    date: "October 2023",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false); // Pause autoplay when user interacts
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoplay(false);
  };

  // Display 3 cards on desktop, 1 on mobile
  const visibleTestimonials = [];
  for (let i = 0; i < 3; i++) {
    const index = (activeIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&rsquo;t just take our word for it. Here&rsquo;s what our valued
            customers have to say about their dining experience at Flavor Haven.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:shadow-xl"
                style={{
                  opacity: idx === 0 ? 1 : idx === 1 ? 0.95 : 0.9,
                  transform:
                    idx === 0
                      ? "scale(1)"
                      : idx === 1
                      ? "scale(0.98)"
                      : "scale(0.95)",
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "text-amber-500 text-lg"
                          : "text-gray-300 text-lg"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-gray-400 text-sm">{testimonial.date}</p>
              </div>
            ))}
          </div>

          {/* Mobile version - single card carousel */}
          <div className="md:hidden">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </div>

              <div className="mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < testimonials[activeIndex].rating
                        ? "text-amber-500 text-lg"
                        : "text-gray-300 text-lg"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 italic mb-4">
                &quot;{testimonials[activeIndex].quote}&quot;
              </p>
              <p className="text-gray-400 text-sm">
                {testimonials[activeIndex].date}
              </p>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-8 items-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-amber-100 transition-colors mr-4"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600"
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

            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-amber-600 w-6" : "bg-amber-300"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-amber-100 transition-colors ml-4"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-600"
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
