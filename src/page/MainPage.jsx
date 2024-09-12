import { useEffect, } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
//import Header from "../module/Main/Header";
import Hero from "../module/Main/Hero";
import About from "../module/Main/About";
import Clients from "../module/Main/Clients";



export default function MainPage() {
  useEffect(() => {
    AOS.init({
      offset: 150,
      duration: 400,
      easing: "ease-in-sine",
    });
  }, []);

  return (
    <>
      
      {/* <Header /> */}
      <Hero />
      <Clients />
      <About />
    </>
  );
}