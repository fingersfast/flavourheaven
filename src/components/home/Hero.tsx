import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center mt-[-6rem]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg-new.jpg"
          alt="Elegant restaurant table setting"
          fill
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmF9fDwAB+QEYytOZIQAAAABJRU5ErkJggg=="
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-white pt-16 animate-fade-in">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Experience Culinary Excellence
          </h1>
          <p className="text-xl mb-8">
            Indulge in a symphony of flavors at Flavor Haven, where every dish
            tells a story of passion and tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-md transition duration-300 text-center transform hover:scale-105"
            >
              View Our Menu
            </Link>
            <Link
              href="/reservations"
              className="bg-transparent hover:bg-white hover:text-amber-600 text-white font-medium py-3 px-8 rounded-md border-2 border-white transition duration-300 text-center transform hover:scale-105"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
