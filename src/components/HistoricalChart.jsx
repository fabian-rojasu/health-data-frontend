import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { subDays, subMonths, subYears, format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = ({ type, period, data }) => {
  const getChartData = () => {
    if (!Array.isArray(data)) {
      return {
        labels: [],
        datasets: [],
      };
    }

    const now = new Date();
    let startDate;

    switch (period) {
      case "1 semana":
        startDate = subDays(now, 7);
        break;
      case "1 mes":
        startDate = subMonths(now, 1);
        break;
      case "3 meses":
        startDate = subMonths(now, 3);
        break;
      case "6 meses":
        startDate = subMonths(now, 6);
        break;
      case "1 año":
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subDays(now, 7);
    }

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= now;
    });

    const labels = filteredData.map((item) => format(new Date(item.date), "dd/MM/yyyy"));
    const dataset = filteredData.map((item) => item.value);

    return {
      labels,
      datasets: [
        {
          label: `Histórico de ${type}`,
          data: dataset,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  return (
    <div className="historical-chart">
      <Line data={getChartData()} />
    </div>
  );
};

export default HistoricalChart;