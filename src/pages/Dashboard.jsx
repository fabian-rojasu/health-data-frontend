import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import ExerciseList from "../components/ExerciseList";
import BodyComposition from "../components/BodyComposition";
import HistoricalChart from "../components/HistoricalChart";

import { GiMuscleUp } from "react-icons/gi";
import { FaWeight, FaRuler, FaWater, FaWalking } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export const Dashboard = ({ dataImportFlag }) => {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dashboardData, setDashboardData] = useState({
    current_weight: 0,
    current_height: 0,
    body_composition: { fat: 0, muscle: 0, water: 0 },
    bmi: 0,
    body_fat_percentage: 0,
    water_glasses: 0,
    steps: 0,
    exercises: [],
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/general/${auth.userId}`
        ); // Ajusta la URL según tu configuración
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (!isLoading) {
      fetchDashboardData();
    }
  }, [auth.userId, isLoading, dataImportFlag]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedMetric, setSelectedMetric] = useState("steps");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [timeRange, setTimeRange] = useState("1w");

  const bodyCompositionData = [
    { name: "Grasa", value: dashboardData.body_composition.fat},
    { name: "Músculo", value: dashboardData.body_composition.muscle },
    { name: "Agua", value: dashboardData.body_composition.water},
  ];

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dashboard-title">Dashboard de Salud</h1>

        <div className="stats-grid">
          <StatCard
            title="Peso"
            value={dashboardData.current_weight}
            unit="kg"
            icon={FaWeight}
          />
          <StatCard
            title="Altura"
            value={dashboardData.current_height}
            unit="cm"
            icon={FaRuler}
          />
          <StatCard title="IMC" value={dashboardData.bmi} icon={GiMuscleUp} />
          <StatCard
            title="Grasa Corporal"
            value={dashboardData.body_fat_percentage}
            unit="%"
            icon={GiMuscleUp}
          />
        </div>

        <div className="stats-grid">
          <StatCard
            title="Vasos de Agua"
            value={dashboardData.water_glasses}
            unit="vasos (250ml)"
            icon={FaWater}
          />
          <StatCard
            title="Agua Total"
            value={(dashboardData.water_glasses * 0.25).toFixed(1)}
            unit="L"
            icon={FaWater}
          />
          <StatCard
            title="Pasos"
            value={dashboardData.steps.toLocaleString()}
            icon={FaWalking}
          />
        </div>

        <div className="charts-grid">
          <BodyComposition data={bodyCompositionData} />
          <ExerciseList exercises={dashboardData.exercises} />
        </div>
      </div>
      <div className="historical-data-section">
        <h2 className="dashboard-subtitle">Datos Históricos</h2>
        <div className="chart-controls">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="steps">Pasos</option>
            <option value="weight">Peso</option>
            <option value="water">Agua</option>
            <option value="exercise">Ejercicio</option>
            <option value="muscle">Músculo</option>
            <option value="fat">Grasa</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1w">Última semana</option>
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
            <option value="1y">Último año</option>
          </select>
        </div>

        <HistoricalChart
          userId={1}
          metricType={selectedMetric}
          timeRange={timeRange}
        />
      </div>
    </div>
  );
};
