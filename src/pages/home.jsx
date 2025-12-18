import React from 'react'
import Hero from "../component/hero"
import Herolast from "../component/herolast"
import Bunner from "../component/bunner"
import ImageGallery from "../component/imagegallery"
import Testimonial from '../component/textimonial'
import Accordind from "../component/according"
import Contact from "../component/contact"
import LastPrium from "../component/lastprium"
import Producs from "../component/product"
export default function home() {
  return (
   <>
  
   <Hero />
   <Herolast />
   <Producs />
   <Bunner />
   <ImageGallery />
  <Testimonial />
  <Accordind />
  <Contact />
  <LastPrium />
   </>
  )
}
