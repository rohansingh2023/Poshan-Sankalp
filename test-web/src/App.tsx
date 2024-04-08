import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  // Event handler to update the selected option
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // useEffect(() => {
  //   const getEvents = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/get_events");
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getEvents();
  // }, []);
  // console.log(selectedValue);
  //
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict-v3", {
        option1: selectedOption === "option1" ? 1.0 : 0.0,
        option2: selectedOption === "option2" ? 1.0 : 0.0,
        option3: selectedOption === "option3" ? 1.0 : 0.0,
      });
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  // };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Select an option:</h2>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">Select an option...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <button onClick={sendDataToBackend}>Send Data</button>
        {/* <p>Selected option: {option1}</p>
        <p>Selected option: {option2}</p>
        <p>Selected option: {option3}</p> */}
      </div>
    </>
  );
}

export default App;
