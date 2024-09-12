import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import React from "react";
import CommentContextProvider from "./CommentContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
export default function CommentMain() {
  useEffect(() => {
    AOS.init({
      offset: 150,
      duration: 400,
      easing: "ease-in-sine",
    });
  }, []);
  return (
    <CommentContextProvider>
      <div data-aos="zoom-in" data-aos-delay="400" className="mt-[5rem] container mx-auto p-4 bg-white rounded-xl ">
        <h1 className="text-3xl font-bold mb-4 text-black">Comments</h1>
        <div className="block rounded-xl border border-gray-300 p-4 font-medium text-md">
        
          <CommentForm />
          <CommentList />
        </div>
      </div>
    </CommentContextProvider>
  );
}
