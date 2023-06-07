import { Line } from "react-chartjs-2";
// import "./LineChartStyles.scss";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineController,
  LineElement,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  LineController,
  LineElement,

  Title
);
const LineChart = ({ listCost }) => {
  console.log("Check list cost", listCost);

  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const mounthLabel = () => {
    let listMounth = [];
    for (let i = 0; i < listCost.length; i++) {
      listMounth.push(labels[i]);
    }
    return listMounth;
  };

  const costLabel = () => {
    let listCost = [];
    for (let i = 0; i < listCost.length; i++) {
      listCost.push(listCost[i].total);
    }
    return listCost;
  };

  console.log("Check for", mounthLabel());

  const [data, setData] = useState({
    data: {
      labels: mounthLabel(),
      datasets: [
        {
          // label: "First Dataset",
          data: costLabel(),
          backgroundColor: "#16917c",
          //   borderColor: "rgba(255, 138, 72, 1)",
          color: "Grey",
          tension: 0.4,
          fill: true,
          borderJoinStyle: "bevel",
          //   showLine: false, //To hide line
          pointBackgroundColor: "#27284a",
          pointBorderColor: "#27284a",
          pointStyle: "circle",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,

      scales: {
        y: {
          ticks: {
            callback: function (value) {
              return value + "tr";
            },
            // forces step size to be 50 units
            stepSize: 40,
            font: {
              size: 10,
            },
          },
          min: 140,
          max: 260,
        },
        x: {
          ticks: {
            font: {
              size: 10,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        // Hide legend
        legend: {
          display: false,
        },
        filler: {
          propagate: false,
        },
      },
      interaction: {
        intersect: true,
      },
    },
  });

  return (
    <div className="line-chart-home">
      <Line id="myCanvas" data={data.data} options={data.options}></Line>
    </div>
  );
};

export default LineChart;
