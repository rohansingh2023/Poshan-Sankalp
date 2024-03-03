"use client"
import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
// import Admin from "layouts/Admin.js";
import Link from "next/link";
import ViewComplaint from "@/components/ViewComplaint";
import IndexNavbar from "@/components/Navbars/IndexNavbar";

import Navbar from "@/components/Navbars/AuthNavbar.js";
import Footer from "@/components/Footers/Footer.js";
// import TransportForm from "@/components/TransportForm";

export default function Fertilizer() {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = () => {
    //   if (status === "unauthenticated") {
    //     signIn();
    //   } 
        setLoading(false);
      
    };
    securePage();
  });

  if (loading) {
    return <h2 style={{ marginTop: 100, textAlign: "center" }}>LOADING...</h2>;
  }
  return (
    <div
      title="Transportation Services"

      
      
    >
        <>
        <IndexNavbar fixed />
        <div className="w-full  px-20 mr-auto ml-auto mt-939 bg-white">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
                  <img
                    alt="..."
                    src="https://cdn.dribbble.com/users/1485099/screenshots/5944791/schedule-appointment.gif"
                    className="w-fit h-auto mx-auto rounded-t-lg "
                  />
                  <blockquote className=" bg-white relative p-8 mb-4 bg-blueGray-700">
                    {/* <svg
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 583 95"
                      className="absolute left-0 w-full block h-95-px -top-94-px bg-blueGray-700"
                    >
                      <polygon
                        points="-30,95 583,95 583,65"
                        className="text-white bg-blueGray-700"
                      ></polygon>
                    </svg> */}
                    <h4 className="text-xl font-bold text-white justify-center bg-blueGray-700">
                    Top-Notch Medical Appointment Facilities
                    </h4>
                    <p className="text-lg font-light mt-2 text-white bg-blueGray-700">
                    Designed to streamline the process of scheduling 
                    appointments with healthcare professionals. This system 
                    allows patients to conveniently book appointments with 
                    doctors, specialists, or other healthcare providers. 
                    The services may include online platforms
                     or traditional phone-based scheduling.
                    </p>
                  </blockquote>
                </div>
              </div>

             
         
            <div className="flex flex-wrap mt-44 justify-center bg-white">
            <div className="bg-white w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://i.pinimg.com/originals/33/ba/21/33ba21ccda561739ab950d66e5616b82.gif"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                  Offline Appointment Booking:
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  Traditional method involving calls or in-person visits to schedule face-to-face consultations, suitable for those preferring physical examinations at the doctor's clinic or healthcare facility.
                  </p> 
                </blockquote>
              </div>
            </div>

            <div className="bg-white w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://cdn.dribbble.com/users/4334101/screenshots/13858125/media/0f1000e10853678e0ab7e880de5bf48e.gif"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                  Online Appointment Booking
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  Schedule virtual consultations and telemedicine appointments through Google meet, offering convenience for minor concerns or when in-person visits are not required.                  </p>
                  
                </blockquote>
              </div>
            </div>

            {/* <div className="w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-70">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://t4.ftcdn.net/jpg/04/28/43/95/360_F_428439504_Z5egu36SdptMVY7i2lqT2bJW6tekdgI2.jpg?t=1631035550&width=600"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                  Truck transportation
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                  This mode of transport is best for shipping goods over short to medium distances, and it is a flexible mode of transport that can accommodate a wide range of cargo types. It is often used for last-mile delivery or for transporting goods between warehouses and distribution centers.</p>
                  
                </blockquote>
              </div>
            </div> */}

            {/* <div className="w-10/12 md:w-6/12 lg:w-6/12 px-22 md:px-8 mr-auto ml-auto -mt-70">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE3-J_g7lJv0zNeflpLXUuE2YaY3Dmhgoj97gP2rW97UowW7XyrgKEmlwuuJub80-euyE&usqp=CAU?t=1631035550&width=600"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-2">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-blueGray-700 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                  Air-charter
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                   transportation: This mode of transport involves hiring an entire aircraft to transport goods, and it is typically used for urgent or high-value shipments that need to be delivered quickly. It is more expensive than regular air transportation but can be faster and more flexible.</p>
                  
                </blockquote>
              </div>
            </div> */}

            <p className="text-lg font-dark leading-relaxed px-10 mt-4 mb-2 text-blueGray-800">
              Each mode of transport has its own advantages and disadvantages, 
              and the choice of mode will depend on factors such as the type of 
              goods being transported, the urgency of the shipment, and the 
              budget available for transport. </p>
              <p className="text-lg font-dark leading-relaxed px-10 mt-2 mb-8 text-blueGray-800">
              A well-designed supply chain will often use a combination of these 
              modes to optimize the movement of goods from origin to destination.
              </p>
                
            <h3 className="text-3xl mb-6 font-semibold leading-normal">
            Enter details to get Transportation Recommendations
              </h3>

             
        <div className="w-full mb-12 xl:mb-0 px-4">
          {/* <ViewComplaint/> */}
        </div>
      </div>

      headerText=""

      
        </>
    
    </div>
  );
}
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   let userId = null;

//   return {
//     props: {
//       session,
//       userId,
//     },
//   };
// }
