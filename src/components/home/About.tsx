import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-w-4 aspect-h-3 relative h-[400px]">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Flavor Haven interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                priority={false}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              />
            </div>
          </div>

          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Culinary Story
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in 2015, Flavor Haven was born from a passion for creating
              memorable dining experiences. Our executive chef, with over 20
              years of experience in fine dining establishments around the
              world, brings a unique perspective to every dish.
            </p>
            <p className="text-gray-600 mb-6">
              We believe in the power of exceptional ingredients, sourced
              locally when possible, and prepared with respect for tradition
              while embracing innovation. Every meal at Flavor Haven is crafted
              to delight the senses and create lasting memories.
            </p>

            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">
                  Locally sourced, seasonal ingredients
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">
                  Artisanal preparation methods
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">
                  Sustainable and eco-friendly practices
                </span>
              </div>
            </div>

            <Link
              href="/reservations"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 transform hover:scale-105"
            >
              Reserve Your Experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
