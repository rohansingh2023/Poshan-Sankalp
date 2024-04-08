import { Footer, Navbar } from "../components";
import axios from "axios";
import { useEffect, useState } from "react";
import BarChartComponent from "../components/charts/BarChartComp";

const Dashboard = () => {
  const [barchartData, setBarChartData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/send-data");
        setBarChartData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  const productSales = [
    {
      name: "Jan",
      product1: 1890,
      product2: 2181,
    },
    {
      name: "Feb",
      product1: 2230,
      product2: 2451,
    },
    {
      name: "March",
      product1: 1500,
      product2: 1731,
    },
  ];

  console.log(barchartData);

  return (
    <div>
      <Navbar />

      <div>
        {/* <AreaChart height={400} width={500} data={productSales}>
          <Area dataKey="product1" />
        </AreaChart> */}
        <BarChartComponent />
        {/* <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[{ data: [4, 1] }, { data: [1] }, { data: [2, 6, 7] }]}
          width={500}
          height={300}
        />

        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={400}
          height={200}
        />

        <ScatterChart
          width={600}
          height={300}
          series={[
            {
              label: "Series A",
              data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
            },
            {
              label: "Series B",
              data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
            },
          ]}
        /> */}
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
