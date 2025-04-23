"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PageTransition from "@/components/ui/PageTransition";

// Menu data
const menuItems = [
  {
    id: 1,
    name: "Truffle Risotto",
    description:
      "Creamy Arborio rice with wild mushrooms, finished with truffle oil and parmesan.",
    price: "$24.99",
    image: "/images/dish1.jpg",
    category: "Main Course",
    dietary: ["vegetarian"],
  },
  {
    id: 2,
    name: "Seared Scallops",
    description:
      "Pan-seared scallops with cauliflower purée, crispy pancetta, and herb oil.",
    price: "$28.99",
    image: "/images/seared-scallops.jpg",
    category: "Seafood",
    dietary: ["gluten-free"],
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: "$12.99",
    image: "/images/dish3.jpg",
    category: "Dessert",
    dietary: ["vegetarian"],
  },
  {
    id: 4,
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, garlic croutons, parmesan cheese, and our house-made Caesar dressing.",
    price: "$14.99",
    image: "/images/caesar-salad.jpg",
    category: "Starters",
    dietary: [],
  },
  {
    id: 5,
    name: "Beef Wellington",
    description:
      "Tender filet mignon wrapped in puff pastry with mushroom duxelles, served with red wine reduction.",
    price: "$38.99",
    image: "/images/beef-wellington.jpg",
    category: "Main Course",
    dietary: [],
  },
  {
    id: 6,
    name: "Lobster Bisque",
    description:
      "Creamy soup made with lobster stock, aromatic vegetables, and a touch of brandy.",
    price: "$16.99",
    image: "/images/lobster-bisque.jpg",
    category: "Starters",
    dietary: ["gluten-free"],
  },
  {
    id: 7,
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon, grilled and served with lemon butter sauce and seasonal vegetables.",
    price: "$26.99",
    image: "/images/grilled-salmon.jpg",
    category: "Seafood",
    dietary: ["gluten-free"],
  },
  {
    id: 8,
    name: "Tiramisu",
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: "$10.99",
    image: "/images/tiramisu.jpg",
    category: "Dessert",
    dietary: ["vegetarian"],
  },
];

const categories = ["All", "Starters", "Main Course", "Seafood", "Dessert"];
const dietaryOptions = ["vegetarian", "gluten-free"];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState(menuItems);

  const toggleDietaryFilter = (filter: string) => {
    if (dietaryFilters.includes(filter)) {
      setDietaryFilters(dietaryFilters.filter((item) => item !== filter));
    } else {
      setDietaryFilters([...dietaryFilters, filter]);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    // Simulate filtering delay for better UX
    const timer = setTimeout(() => {
      const filtered = menuItems.filter((item) => {
        // Filter by category
        const categoryMatch =
          selectedCategory === "All" || item.category === selectedCategory;

        // Filter by dietary restrictions
        const dietaryMatch =
          dietaryFilters.length === 0 ||
          dietaryFilters.every((filter) => item.dietary.includes(filter));

        return categoryMatch && dietaryMatch;
      });

      setVisibleItems(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedCategory, dietaryFilters]);

  return (
    <PageTransition>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully crafted menu featuring the finest
              ingredients and culinary traditions from around the world.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Dietary filters */}
              <div className="flex flex-wrap gap-4">
                {dietaryOptions.map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={dietaryFilters.includes(option)}
                      onChange={() => toggleDietaryFilter(option)}
                    />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        dietaryFilters.includes(option)
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {dietaryFilters.includes(option) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Menu items */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner text="Updating menu..." />
            </div>
          ) : (
            <>
              {visibleItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visibleItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {item.dietary.length > 0 && (
                          <div className="absolute top-2 right-2 flex gap-1">
                            {item.dietary.includes("vegetarian") && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                                Vegetarian
                              </span>
                            )}
                            {item.dietary.includes("gluten-free") && (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                                Gluten-Free
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <span className="text-amber-600 font-medium">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            {item.category}
                          </span>
                          <button className="text-amber-600 hover:text-amber-800 transition-colors">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path
                                fillRule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No matching items found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
