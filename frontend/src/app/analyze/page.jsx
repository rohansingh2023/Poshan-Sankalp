"use client"
import React, { useState, useEffect } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
// import Admin from "layouts/Admin.js";
import DiseaseForm from "@/components/DiseaseForm";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
export default function Disease() {
  const { data: session, status } = useSession();
  console.log(session);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const securePage = () => {
      
        setLoading(false);
    
    };
    securePage();
  });

  if (loading) {
    return <h2 style={{ marginTop: 100, textAlign: "center" }}>LOADING...</h2>;
  }
  return (

    <> 
       <IndexNavbar fixed />
    <section className="relative py-20">
    <div
      className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "
      style={{ transform: "translateZ(0)" }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="text-white fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>

    <div className="container mx-auto px-4 mt-0">
      <div className="items-center flex flex-wrap bg-white">
        <div className="w-full md:w-5/12 ml-auto mt-0 mr-auto px-2">
          <img
            alt="..."
            className="max-w-full rounded-lg shadow-lg"
            src="https://cdn.dribbble.com/userupload/11743109/file/original-a3fe110e0b3037c286b80b033b476102.gif"
          />
        </div>
        <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
          <div className="md:pr-12">
            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-500">
              <i className="fas fa-rocket text-xl"></i>
            </div>
            <h3 className="text-3xl font-semibold text-blueGray-500">AI-Enhanced Report Analysis</h3>
            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
            The preorts are analyzed in a clear format, highlighting normal findings and flagging
             abnormal levels. This facilitates prompt decision-making and guides 
             appropriate actions for improved outcomes.
            </p>
            <ul className="list-none mt-6">
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                      <i className="fas fa-fingerprint"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-blueGray-500">
                    1. Upload Your Report
                    </h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                      <i className="fab fa-html5"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-blueGray-500">
                    2. Uncover Hidden Patterns
                    </h4>
                  </div>
                </div>
              </li>
              <li className="py-2">
                <div className="flex items-center">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                      <i className="far fa-paper-plane"></i>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-blueGray-500 mb-3">
                    3. Get clear, actionable recommendations 
                    </h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
    <div
      title="Disease Detection"
      Text="Upload Image to detect crop disease"
      // image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <DiseaseForm />
        </div>
      </div>
    </div>
    </>
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
