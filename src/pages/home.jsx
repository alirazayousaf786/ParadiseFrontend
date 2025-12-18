import Hero from "../component/hero.jsx";
import HeroLast from "../component/herolast.jsx";
import Bunner from "../component/bunner.jsx";
import ImageGallery from "../component/imagegallery.jsx";
import Textimonial from "../component/textimonial.jsx";
import According from "../component/according.jsx";
import Contact from "../component/contact.jsx";
import LastPrium from "../component/lastprium.jsx";
import Product from "../component/product.jsx";

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
