import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Predict from "./components/Predict";

function App() {
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

export default App;
