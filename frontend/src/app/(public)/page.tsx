// "use client";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import useScreenWidth from "@/app/(public)/hooks/useScreenWidth";
// import TestimonialSlider from "@/app/(public)/components/TestimonialSlide";
// import Footer from "@/app/(public)/components/Footer";
// import ThreeStepSection from "./components/GettingStarted";

// export default function Home() {
//   const width = useScreenWidth();

//   return (
//     <>
//       <div className="relative min-h-screen max-w-[1600px] mx-auto top-[10rem]">
//         <Image
//           src="/images/test5.png"
//           alt="Background"
//           layout="fill"
//           objectFit="contain"
//           objectPosition="center top"
//           className="bg-no-repeat"
//         />
//         <div className="relative top-[.5vw] left-[22vw] desktop-sm:top-[1vw] z-0">
//           <div className="w-full flex z-0">
//             <div className="bg-gray-200 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute z-10"></div>
//             <div className="bg-gray-400 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute left-[3vw] z-20"></div>
//             <div className="bg-gray-600 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute left-[6vw] z-30"></div>
//           </div>
//         </div>
//         <div className="relative top-[9vw] w-[50vw] flex flex-col">
//           <h1 className="laptop-sm:text-[min(3vw,3rem)] laptop-sm:pt-0 desktop-lg:pt-10 text-[min(4vw,1.9rem)] font-bold text-[#464646] leading-tight">
//             {/* Fueling Agricultural Growth and Providing Food Security. */}
//             Connecting You to High-Value Agricultural Commodities
//           </h1>
//           {/* This is for desktop */}
//           <p className="py-4 text-[min(2vw,1.30rem)] laptop-lg:w-[min(38vw,40rem)] hidden w-[40vw] laptop-sm:block font-light leading-snug">
//             Invest, trade, and sell agricultural products on a trusted platform.
//           </p>
//           <button className="bg-green-600 hover:bg-green-700 laptop-sm:block hidden mt-[10vw] wide:mt-[13vw] text-white mx-[2rem] py-3 rounded-lg font-bold transition-all duration-300 shadow-md relative w-[14rem]">
//             Join Our Network
//           </button>
//         </div>
//         <div className="bg-gradient-to-br from-[#30a534] to-[#30a534] py-[2vw] px-[0.2vw] rounded-[30px] shadow-lg relative top-[min(45vw,25rem)] block laptop-sm:hidden text-center overflow-hidden">
//           <div className="flex flex-col items-center">
//             {/* Decorative balls of various sizes */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-green-400 opacity-20 rounded-full -mr-6 -mt-6"></div>
//             <div className="absolute top-10 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
//             <div className="absolute bottom-12 right-20 w-24 h-24 bg-green-400 opacity-20 rounded-full"></div>
//             <div className="absolute top-24 right-32 w-20 h-20 bg-white opacity-10 rounded-full"></div>
//             <div className="absolute bottom-4 left-16 w-12 h-12 bg-green-400 opacity-15 rounded-full"></div>
//             <div className="absolute top-16 left-32 w-28 h-28 bg-green-400 opacity-20 rounded-full"></div>
//             <div className="absolute bottom-20 right-40 w-16 h-16 bg-white opacity-10 rounded-full"></div>
//             <div className="absolute top-32 left-12 w-10 h-10 bg-green-400 opacity-15 rounded-full"></div>
//             <div className="absolute top-6 right-16 w-8 h-8 bg-white opacity-10 rounded-full"></div>
//             <div className="absolute bottom-6 left-40 w-20 h-20 bg-green-400 opacity-20 rounded-full"></div>
//             {/* Text container with better typography and spacing */}
//             <div className="relative z-10 text-center px-6 py-8">
//               <h2 className="text-white laptop-lg:text-3xl text-2xl font-semibold mb-6">
//                 Agricultural Network
//               </h2>
//               <p className="text-white text-lg leading-snug  max-w-2xl ">
//                 Join a powerful network that empowers farmers with direct access
//                 to wholesale markets. <br />{" "}
//                 <span className="font-semibold">
//                   Invest, trade, and sell agricultural products on a trusted
//                   platform.
//                 </span>
//               </p>
//               {/* Call to action button */}
//               <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-md">
//                 Join Network
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="relative w-full top-[min(55vw,30rem)] laptop-sm:top-[min(19vw,70rem)] wide:top-[min(20vw)] text-[#464646] text-2xl">
//           <div className="laptop-sm:flex gap-x-[8rem] my-[4rem] text-[min(6vw,2rem)]">
//             <h2 className="laptop-sm:text-left text-center flex-1/2">
//               Harnessing <br className="hidden laptop-sm:block" />
//               <span className="font-extrabold text-[#464646]">
//                 digital networks
//               </span>{" "}
//               to Transform <br className="hidden laptop-sm:block" />
//               <span className="font-extrabold text-[#464646]">
//                 Agricultural Trade
//               </span>{" "}
//               and Commodity
//               <span className="font-extrabold text-[#464646]">
//                 {" "}
//                 Storage
//               </span>{" "}
//             </h2>
//             <p className="hidden laptop-sm:flex flex-1/2 text-[1rem] items-end">
//               bushMarket connects farmers, sellers, and investors through smart
//               technology—streamlining storage, boosting price efficiency, and
//               enabling secure, profitable trade across the agricultural supply
//               chain.
//             </p>
//           </div>

//           <ThreeStepSection />

//           <div className="w-full grid justify-center items-center pt-14">
//             <div className="grid tablet-lg:grid-cols-2 gap-4 items-center justify-center">
//               <div className="relative h-[10rem] mobile-sm:h-[15rem] tablet-sm:h-[20rem] tablet-lg:h-[25rem] w-[min(90vw,30rem)] tablet-lg:w-[min(45vw,40rem)] desktop-sm:w-[min(40vw,100rem)] rounded-[30px] overflow-hidden">
//                 <Image
//                   src="/images/test15.png"
//                   alt="Background 1"
//                   layout="fill"
//                   objectFit="contain"
//                   objectPosition="center top"
//                   className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
//                 />
//                 <div className="relative p-[clamp(1.5rem,8vw,3rem)] tablet-lg:p-[3.5vw] wide:p-[min(3.5v,4rem)] desktop-lg:p-[3rem ] wide:text-[min(1.7vw,2rem)] tablet-lg:text-[min(2vw,1.2rem)] text-white text-[min(3.4vw,1.2rem)]">
//                   <h2 className="text-[clamp(.7rem,5vw,1.8rem)] tablet-lg:text-[clamp(.7rem,3vw,3rem)] desktop-sm:text-[clamp(.7rem,2.5vw,3rem)] leading-tight">
//                     <span className="font-bold">Storage solutions</span> for{" "}
//                     <span className="font-bold">
//                       optimal <span className="font-normal">produce</span>{" "}
//                       freshness
//                     </span>{" "}
//                     and <span className="font-bold">safety.</span>
//                   </h2>
//                   <div className="absolute w-full flex top-[min(37.5vw,12.5rem)] text-black h-full tablet-lg:top-[min(18.5vw,20rem)] desktop-lg:top-[min(17vw,40rem)] desktop-sm:top-[min(16vw,30rem)]">
//                     <div className="tablet-lg:h-[min(4.5vw,2.7rem)] tablet-lg:w-[min(14vw,10rem)] h-[min(8vw,2.5rem)] w-[min(23vw,8rem)] bg-white rounded-[38px] relative z-20 flex items-center justify-center">
//                       <p className="text-[min(3vw,1rem)] tablet-lg:text-[min(1.5vw,1rem)] text-center text-black font-[500] cursor-pointer">
//                         Learn more
//                       </p>
//                     </div>
//                     <div className="rounded-full cursor-pointer text-[min(6vw,1rem)] tablet-lg:w-[min(4.5vw,2.7rem)] bg-white w-[min(8vw,2.5rem)] tablet-lg:h-[min(4.5vw,2.7rem)] h-[min(8vw,2.5rem)] z-20 flex items-center justify-center">
//                       <ArrowUpRight />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative h-[10rem] mobile-sm:h-[15rem] tablet-sm:h-[20rem] tablet-lg:h-[25rem] w-[min(90vw,30rem)] tablet-lg:w-[min(45vw,40rem)] desktop-sm:w-[min(40vw,100rem)] rounded-[30px] overflow-hidden">
//                 <Image
//                   src="/images/test14.png"
//                   alt="Background 2"
//                   layout="fill"
//                   objectFit="contain"
//                   objectPosition="center top"
//                   className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
//                 />
//               </div>
//             </div>
//             <div className="text-center pt-[min(1rem, 15vw,3rem)] tablet-lg:pt-0 wide:pt-[min(5vw,8rem)]">
//               <h1 className="text-[min(6vw,3rem)] leading-tight max-w-[850px] mx-auto font-semibold">
//                 We are currently building and{" "}
//                 <span className="font-extrabold text-[#464646]">
//                   open for{" "}
//                   <span className="text-[#30a534]">partnership...</span>
//                 </span>
//               </h1>
//             </div>
//             <div className="relative h-[60vh]">
//               <div className="">
//                 <Image
//                   src="/images/test15.avif"
//                   alt="Background 2"
//                   layout="fill"
//                   objectFit="contain"
//                   objectPosition="center top"
//                   className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
//                 />
//               </div>
//               <div className="absolute top-[min(45vw,30rem)] desktop-lg:top-[min(35vw,30rem)] w-full">
//                 <h1 className="font-semibold text-[min(6vw,3rem)] text-center">
//                   ...across the{" "}
//                   <span className="text-[#30a534] font-extrabold">globe</span>
//                 </h1>
//                 <h1 className="font-extrabold relative top-[3rem] text-[min(5.5vw,2.5rem)] text-[#30a534] text-center">
//                   Stakeholders{" "}
//                   <span className="text-[#464646] font-semibold">Recount</span>
//                 </h1>
//                 <p className="relative top-[4rem] text-[min(4vw,1.4rem)] text-[#464646] text-center">
//                   Real stories from the fields:{" "}
//                   <span className="">
//                     Hear from farmers, buyers and sellers firsthand.
//                   </span>
//                 </p>
//                 <TestimonialSlider />
//                 <div className="relative mb-12 mt-[12rem]">
//                   <div className="relative h-80 rounded-3xl overflow-hidden bg-gray-100">
//                     {/* Background Image */}
//                     <Image
//                       src="/images/test6.jpg"
//                       alt="Newsletter background"
//                       fill
//                       style={{
//                         objectFit: "cover",
//                         objectPosition: "center top",
//                       }}
//                       className="rounded-3xl"
//                       priority
//                     />

//                     {/* Content Overlay */}
//                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6 laptop-sm:px-12 py-8">
//                       <div className="flex flex-col laptop-sm:flex-row laptop-sm:items-center gap-8 w-full max-w-4xl">
//                         {/* Text Section */}
//                         <div className="text-center laptop-sm:text-left text-white laptop-sm:flex-1">
//                           <h2 className="text-2xl laptop-sm:text-3xl font-semibold mb-2">
//                             Subscribe to Our Newsletter
//                           </h2>
//                           <p className="text-sm laptop-sm:text-base">
//                             Receive valuable insights and updates directly in
//                             your inbox
//                           </p>
//                         </div>

//                         {/* Form Section */}
//                         <form className="laptop-sm:flex-1 w-full laptop-sm:max-w-md">
//                           <div className="relative">
//                             <input
//                               type="email"
//                               className="w-full h-12 laptop-sm:h-14 text-sm rounded-xl pl-4 pr-32 text-gray-800 outline-none focus:ring-2 focus:ring-green-500 bg-white/90"
//                               placeholder="Enter your email"
//                               required
//                               aria-label="Email address"
//                             />
//                             <button
//                               type="submit"
//                               className="absolute right-2 top-1/2 -translate-y-1/2 h-9 laptop-sm:h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 laptop-sm:px-6 text-sm transition-colors duration-200"
//                             >
//                               Subscribe
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mb-[4rem]">
//                   <Footer />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import TestimonialSlider from "@/app/(public)/components/TestimonialSlide";
import Footer from "@/app/(public)/components/Footer";
import ThreeStepSection from "./components/GettingStarted";

export default function Home() {

  return (
    <>
      <div className="relative min-h-screen max-w-[1600px] mx-auto top-[10rem]">
        <Image
          src="/images/test5.png"
          alt="Background"
          layout="fill"
          objectFit="contain"
          objectPosition="center top"
          className="bg-no-repeat"
        />
        <div className="relative top-[.5vw] left-[22vw] desktop-sm:top-[1vw] z-0">
          <div className="w-full flex z-0">
            <div className="bg-gray-200 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute z-10"></div>
            <div className="bg-gray-400 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute left-[3vw] z-20"></div>
            <div className="bg-gray-600 h-[6vw] w-[6vw] rounded-full max-h-[70px] max-w-[70px] border-[.3rem] border-white absolute left-[6vw] z-30"></div>
          </div>
        </div>
        <div className="relative top-[9vw] w-[50vw] flex flex-col">
          <h1 className="laptop-sm:text-[min(3vw,3rem)] laptop-sm:pt-0 desktop-lg:pt-10 text-[min(4vw,1.9rem)] font-bold text-[#464646] leading-tight">
            {/* Fueling Agricultural Growth and Providing Food Security. */}
            Connecting You to High-Value Agricultural Commodities
          </h1>
          {/* This is for desktop */}
          <p className="py-4 text-[min(2vw,1.30rem)] laptop-lg:w-[min(38vw,40rem)] hidden w-[40vw] laptop-sm:block font-light leading-snug">
            Invest, trade, and sell agricultural products on a trusted platform.
          </p>
          <button className="bg-green-600 hover:bg-green-700 laptop-sm:block hidden mt-[10vw] wide:mt-[13vw] text-white mx-[2rem] py-3 rounded-lg font-bold transition-all duration-300 shadow-md relative w-[14rem]">
            Join Our Network
          </button>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 py-[2vw] px-[0.2vw] rounded-b-[20px] shadow-lg relative top-[min(80rem,35vw,30rem)] z-[-10] block laptop-sm:hidden text-center overflow-hidden">
          <div className="flex flex-col items-center">
            {/* Decorative balls of various sizes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700 opacity-20 rounded-full -mr-6 -mt-6"></div>
            <div className="absolute top-10 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-12 right-20 w-24 h-24 bg-gray-700 opacity-20 rounded-full"></div>
            <div className="absolute top-24 right-32 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-4 left-16 w-12 h-12 bg-gray-700 opacity-15 rounded-full"></div>
            <div className="absolute top-16 left-32 w-28 h-28 bg-gray-700 opacity-20 rounded-full"></div>
            <div className="absolute bottom-20 right-40 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-32 left-12 w-10 h-10 bg-gray-700 opacity-15 rounded-full"></div>
            <div className="absolute top-6 right-16 w-8 h-8 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-6 left-40 w-20 h-20 bg-gray-700 opacity-20 rounded-full"></div>
            {/* Text container with better typography and spacing */}
            <div className="relative z-10 text-center px-6 py-8">
              <h2 className="text-white laptop-lg:text-3xl text-2xl font-semibold mb-6">
                Agricultural Network
              </h2>
              <p className="text-white text-lg leading-snug  max-w-2xl ">
                Join a powerful network that empowers farmers with direct access
                to wholesale markets. <br />{" "}
                <span className="font-semibold">
                  Invest, trade, and sell agricultural products on a trusted
                  platform.
                </span>
              </p>
              {/* Call to action button */}
              <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-all duration-300 shadow-md">
                Join Network
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full top-[min(55vw,30rem)] laptop-sm:top-[min(19vw,70rem)] wide:top-[min(20vw)] text-[#464646] text-2xl">
          <div className="laptop-sm:flex gap-x-[8rem] my-[4rem] text-[min(6vw,2rem)]">
            <h2 className="laptop-sm:text-left text-center flex-1/2">
              Harnessing <br className="hidden laptop-sm:block" />
              <span className="font-extrabold text-[#464646]">
                digital networks
              </span>{" "}
              to Transform <br className="hidden laptop-sm:block" />
              <span className="font-extrabold text-[#464646]">
                Agricultural Trade
              </span>{" "}
              and Commodity
              <span className="font-extrabold text-[#464646]">
                {" "}
                Storage
              </span>{" "}
            </h2>
            <p className="hidden laptop-sm:flex flex-1/2 text-[1rem] items-end">
              bushMarket connects farmers, sellers, and investors through smart
              technology—streamlining storage, boosting price efficiency, and
              enabling secure, profitable trade across the agricultural supply
              chain.
            </p>
          </div>

          <ThreeStepSection />

          <div className="w-full grid justify-center items-center pt-14">
            <div className="grid tablet-lg:grid-cols-2 gap-4 items-center justify-center">
              <div className="relative h-[10rem] mobile-sm:h-[15rem] tablet-sm:h-[20rem] tablet-lg:h-[25rem] w-[min(90vw,30rem)] tablet-lg:w-[min(45vw,40rem)] desktop-sm:w-[min(40vw,100rem)] rounded-[30px] overflow-hidden">
                <Image
                  src="/images/test15.png"
                  alt="Background 1"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center top"
                  className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
                />
                <div className="relative p-[clamp(1.5rem,8vw,3rem)] tablet-lg:p-[3.5vw] wide:p-[min(3.5v,4rem)] desktop-lg:p-[3rem ] wide:text-[min(1.7vw,2rem)] tablet-lg:text-[min(2vw,1.2rem)] text-white text-[min(3.4vw,1.2rem)]">
                  <h2 className="text-[clamp(.7rem,5vw,1.8rem)] tablet-lg:text-[clamp(.7rem,3vw,3rem)] desktop-sm:text-[clamp(.7rem,2.5vw,3rem)] leading-tight">
                    <span className="font-bold">Storage solutions</span> for{" "}
                    <span className="font-bold">
                      optimal <span className="font-normal">produce</span>{" "}
                      freshness
                    </span>{" "}
                    and <span className="font-bold">safety.</span>
                  </h2>
                  <div className="absolute w-full flex top-[min(37.5vw,12.5rem)] text-black h-full tablet-lg:top-[min(18.5vw,20rem)] desktop-lg:top-[min(17vw,40rem)] desktop-sm:top-[min(16vw,30rem)]">
                    <div className="tablet-lg:h-[min(4.5vw,2.7rem)] tablet-lg:w-[min(14vw,10rem)] h-[min(8vw,2.5rem)] w-[min(23vw,8rem)] bg-white rounded-[38px] relative z-20 flex items-center justify-center">
                      <p className="text-[min(3vw,1rem)] tablet-lg:text-[min(1.5vw,1rem)] text-center text-black font-[500] cursor-pointer">
                        Learn more
                      </p>
                    </div>
                    <div className="rounded-full cursor-pointer text-[min(6vw,1rem)] tablet-lg:w-[min(4.5vw,2.7rem)] bg-white w-[min(8vw,2.5rem)] tablet-lg:h-[min(4.5vw,2.7rem)] h-[min(8vw,2.5rem)] z-20 flex items-center justify-center">
                      <ArrowUpRight />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[10rem] mobile-sm:h-[15rem] tablet-sm:h-[20rem] tablet-lg:h-[25rem] w-[min(90vw,30rem)] tablet-lg:w-[min(45vw,40rem)] desktop-sm:w-[min(40vw,100rem)] rounded-[30px] overflow-hidden">
                <Image
                  src="/images/test14.png"
                  alt="Background 2"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center top"
                  className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
                />
              </div>
            </div>
            <div className="text-center pt-[min(1rem, 15vw,3rem)] tablet-lg:pt-0 wide:pt-[min(5vw,8rem)]">
              <h1 className="text-[min(6vw,3rem)] leading-tight max-w-[850px] mx-auto font-semibold">
                We are currently building and{" "}
                <span className="font-extrabold text-[#464646]">
                  open for{" "}
                  <span className="text-[#30a534]">partnership...</span>
                </span>
              </h1>
            </div>
            <div className="relative h-[60vh]">
              <div className="">
                <Image
                  src="/images/test15.avif"
                  alt="Background 2"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center top"
                  className="bg-no-repeat pt-4 px-[.5rem] tablet-sm:px-[1rem]"
                />
              </div>
              <div className="absolute top-[min(45vw,30rem)] desktop-lg:top-[min(35vw,30rem)] w-full">
                <h1 className="font-semibold text-[min(6vw,3rem)] text-center">
                  ...across the{" "}
                  <span className="text-[#30a534] font-extrabold">globe</span>
                </h1>
                <h1 className="font-extrabold relative top-[3rem] text-[min(5.5vw,2.5rem)] text-[#30a534] text-center">
                  Stakeholders{" "}
                  <span className="text-[#464646] font-semibold">Recount</span>
                </h1>
                <p className="relative top-[4rem] text-[min(4vw,1.4rem)] text-[#464646] text-center">
                  Real stories from the fields:{" "}
                  <span className="">
                    Hear from farmers, buyers and sellers firsthand.
                  </span>
                </p>
                <TestimonialSlider />
                <div className="relative mb-12 mt-[12rem]">
                  <div className="relative h-80 rounded-3xl overflow-hidden bg-gray-100">
                    {/* Background Image */}
                    <Image
                      src="/images/test6.jpg"
                      alt="Newsletter background"
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                      className="rounded-3xl"
                      priority
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6 laptop-sm:px-12 py-8">
                      <div className="flex flex-col laptop-sm:flex-row laptop-sm:items-center gap-8 w-full max-w-4xl">
                        {/* Text Section */}
                        <div className="text-center laptop-sm:text-left text-white laptop-sm:flex-1">
                          <h2 className="text-2xl laptop-sm:text-3xl font-semibold mb-2">
                            Subscribe to Our Newsletter
                          </h2>
                          <p className="text-sm laptop-sm:text-base">
                            Receive valuable insights and updates directly in
                            your inbox
                          </p>
                        </div>

                        {/* Form Section */}
                        <form className="laptop-sm:flex-1 w-full laptop-sm:max-w-md">
                          <div className="relative">
                            <input
                              type="email"
                              className="w-full h-12 laptop-sm:h-14 text-sm rounded-xl pl-4 pr-32 text-gray-800 outline-none focus:ring-2 focus:ring-green-500 bg-white/90"
                              placeholder="Enter your email"
                              required
                              aria-label="Email address"
                            />
                            <button
                              type="submit"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 laptop-sm:h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 laptop-sm:px-6 text-sm transition-colors duration-200"
                            >
                              Subscribe
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-[4rem]">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
