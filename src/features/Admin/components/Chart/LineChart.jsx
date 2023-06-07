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
import { useState } from "react";

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
const LineChart = () => {
  const [data, setData] = useState({
    data: {
      labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
      datasets: [
        {
          // label: "First Dataset",
          data: [150, 148, 180, 245, 190, 220, 230],
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
