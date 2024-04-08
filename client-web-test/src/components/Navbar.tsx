import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 bg-[#023e8a] flex items-center justify-between">
      <img
        src="https://www.shutterstock.com/image-vector/hunger-person-icon-poverty-concept-260nw-2161558455.jpg"
        alt=""
        className="h-16 w-16 rounded-full ml-10"
      />
      <div className="flex items-center justify-around space-x-10 mr-20">
        <a
          className="text-lg font-semibold bg-red-400 p-2 rounded-md"
          href="#predict"
        >
          Predict
        </a>
        <Link to={"/dashboard"}>
          <h2 className="text-lg font-semibold bg-red-400 p-2 rounded-md">
            Dashboard
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
