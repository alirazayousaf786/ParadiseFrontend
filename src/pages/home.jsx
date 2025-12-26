import Hero from "../component/Hero.jsx";
import HeroLast from "../component/Herolast.jsx";
import Bunner from "../component/Bunner.jsx";
import ImageGallery from "../component/Imagegallery.jsx";
import Textimonial from "../component/Textimonial.jsx";
import According from "../component/According.jsx";
import Contact from "../component/Contact.jsx";
import LastPrium from "../component/LastPrium.jsx";
import Product from "../component/Product.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroLast />
      <Product />
      <Bunner />
      <ImageGallery />
      <Textimonial />
      <According />
      <Contact />
      <LastPrium />
    </>
  );
}
