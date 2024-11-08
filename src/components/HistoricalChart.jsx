import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react/prop-types
const HistoricalChart = ({ userId, metricType, timeRange }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/historical/${userId}?metric_type=${metricType}&time_range=${timeRange}`
        );
        const data = await response.json();
        
        if (metricType === 'exercise') {
          const exerciseCounts = data.dates.map(date => {
            const dayData = data.data[date];
            return dayData.exercises.reduce((total, ex) => total + ex.count, 0);
          });

          setChartData({
            labels: data.dates,
            datasets: [
              {
                label: 'Total Exercise Count',
                data: exerciseCounts,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              },
              {
                label: 'Duration (minutes)',
                data: data.total_duration,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
              }
            ]
          });
        } else {
          setChartData({
            labels: data.dates,
            datasets: [{
              label: getMetricLabel(metricType),
              data: data.values,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          });
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, metricType, timeRange]);

  const getMetricLabel = (type) => {
    const labels = {
      weight: 'Weight (kg)',
      muscle: 'Muscle Mass (%)',
      fat: 'Body Fat (%)',
      water: 'Water (ml)',
      steps: 'Steps Count'
    };
    return labels[type] || type;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Historical ${getMetricLabel(metricType)} Data`
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!chartData) return <div>No data available</div>;

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HistoricalChart;
