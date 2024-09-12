import { FaStar } from "react-icons/fa";
import Img1 from "../../assets/MainImage/Haircut1.png";
import Img2 from "../../assets/MainImage/Haircut2.png";
import Img3 from "../../assets/MainImage/Haircut4.png"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom"; // Import useNavigate

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "ช่างบาส",

  },
  {
    id: 2,
    img: Img2,
    title: "ช่างต้า",

  },
  {
    id: 3,
    img: Img3,
    title: "ช่างจ๊อบ",

  },
  {
    id: 4,
    img: Img1,
    title: "ช่าง1",

  },
  {
    id: 5,
    img: Img2,
    title: "ช่าง2",

  },
  {
    id: 6,
    img: Img3,
    title: "ช่าง3",

  },
];

export default function Haircut() {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const { data } = location.state


  useEffect(() => {
    AOS.init({
      offset: 150,
      duration: 400,
      easing: "ease-in-sine",
    });
  }, []);

  const handleCardClick = (mbarber ) => {
    navigate('/barberpage' , {state:{data , mbarber}});
  };

  return (
    <section
      id="haircut"
      className="w-[100%] m-auto flex lg:flex-row flex-col justify-between items-center gap-28 py-20"
    >
      <div className="container">
        <div className="text-left mb-[160px]">
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            ช่างตัดผม
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[100px] md:gap-5 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="rounded-2x1 px-20 hover:bg-black hover:text-white relative shadow-2xl duration-300 group max-w-[400px] mb-[170px]"
              onClick={() => handleCardClick(data)} // Add onClick event
            >
              <div className="h-[100px] mb-[150px]">
                <img
                  src={data.img}
                  alt=""
                  className="max-w-[200px] block transform-translate group-hover:scale-150 duration-300 drop-shadow-md rounded-md"
                />
              </div>

              <div className="p-10 text-center">
                <div className="w-full flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-primary" />
                  ))}
                </div>
                <h1 className="text-xl font-bold mb-2">{data.title}</h1>
                <p
                  className="mt-1 text-left text-primary font-bold group-hover:text-white duration-300 text-sm px-0 mb-2"
                >
                  {data.description}
                </p>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
