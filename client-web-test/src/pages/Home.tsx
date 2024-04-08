import { Footer, Hero, Navbar, Predict } from "../components";

function Home() {
  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center mt-10">
        <Hero />
      </div>
      <div className="flex items-center justify-center mt-10">
        <Predict />
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
