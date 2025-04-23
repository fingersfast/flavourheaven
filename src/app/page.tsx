import Hero from "@/components/home/Hero";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import About from "@/components/home/About";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <About />
      <Gallery />
      <Testimonials />
    </>
  );
}
