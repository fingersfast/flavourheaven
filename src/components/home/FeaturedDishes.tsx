import Image from "next/image";
import Link from "next/link";

// Sample data for featured dishes
const featuredDishes = [
  {
    id: 1,
    name: "Truffle Risotto",
    description:
      "Creamy Arborio rice with wild mushrooms, finished with truffle oil and parmesan.",
    price: "$24.99",
    image: "/images/dish1.jpg",
    category: "Main Course",
  },
  {
    id: 2,
    name: "Seared Scallops",
    description:
      "Pan-seared scallops with cauliflower purée, crispy pancetta, and herb oil.",
    price: "$28.99",
    image: "/images/seared-scallops.jpg",
    category: "Seafood",
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: "$12.99",
    image: "/images/dish3.jpg",
    category: "Dessert",
  },
];

const FeaturedDishes = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Signature Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our chef&apos;s carefully crafted specialties, made with
            the finest ingredients and passion for culinary excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish, index) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-sm font-medium bg-amber-600 px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{dish.name}</h3>
                  <span className="text-amber-600 font-medium">
                    {dish.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {dish.category}
                  </span>
                  <button className="text-amber-600 hover:text-amber-800 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 transform hover:scale-105"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
