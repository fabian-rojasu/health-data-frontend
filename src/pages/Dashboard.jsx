import React, { useState, useEffect } from 'react';
import StatCard from "../components/StatCard";
import ExerciseList from "../components/ExerciseList";
import BodyComposition from "../components/BodyComposition";
import HistoricalChart from "../components/HistoricalChart";
import axios from 'axios';
import { GiMuscleUp } from "react-icons/gi";
import { FaWeight, FaRuler, FaWater, FaWalking } from 'react-icons/fa';

export const Dashboard = () => {
  const userData = {
    weight: 70,
    height: 175,
    waterGlasses: 6,
    steps: 8500,
    bodyComposition: [
      { name: "Grasa", value: 10.5 },
      { name: "Músculo", value: 35.0 },
      { name: "Agua", value: 24.5 },
    ],
    exercises: [
      { name: "Correr", duration: 30 },
      { name: "Pesas", duration: 45 },
      { name: "Estiramientos", duration: 15 },
    ],
    dailySteps: [
      { date: '2023-01-01', value: 10000 },
      { date: '2023-01-02', value: 12000 },
    ],
  };

  const [timePeriod, setTimePeriod] = useState([]);
  const [historicalType, setHistoricalType] = useState([]);
  const [dailySteps, setDailySteps] = useState([]);

  useEffect(() => {
    const fetchDailySteps = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/daily-steps/', {
          params: {
            user_id: 1, // Cambia esto según sea necesario
            start_date: '2024-04-10', // Cambia esto según sea necesario
            end_date: '2024-04-17' // Cambia esto según sea necesario
          }
        });
        setDailySteps(response.data);
      } catch (error) {
        console.error('Error fetching daily steps:', error);
      }
    };

    fetchDailySteps();
  }, [timePeriod, historicalType]);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handleHistoricalTypeChange = (event) => {
    setHistoricalType(event.target.value);
  };

  const heightInMeters = userData.height / 100;
  const bmi = userData.weight / (heightInMeters * heightInMeters);
  const bodyFatPercentage =
    (userData.bodyComposition[0].value / userData.weight) * 100;
  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dashboard-title">Dashboard de Salud</h1>

        <div className="stats-grid">
          <StatCard
            title="Peso"
            value={userData.weight}
            unit="kg"
            icon={FaWeight}
          />
          <StatCard
            title="Altura"
            value={userData.height}
            unit="cm"
            icon={FaRuler}
          />
          <StatCard title="IMC" value={bmi.toFixed(1)} icon={GiMuscleUp} />
          <StatCard
            title="Grasa Corporal"
            value={bodyFatPercentage.toFixed(1)}
            unit="%"
            icon={GiMuscleUp}
          />
        </div>

        <div className="stats-grid">
          <StatCard
            title="Vasos de Agua"
            value={userData.waterGlasses}
            unit="vasos (250ml)"
            icon={FaWater}
          />
          <StatCard
            title="Agua Total"
            value={(userData.waterGlasses * 0.25).toFixed(1)}
            unit="L"
            icon={FaWater}
          />
          <StatCard
            title="Pasos"
            value={userData.steps.toLocaleString()}
            icon={FaWalking}
          />
        </div>

        <div className="charts-grid">
          <BodyComposition data={userData.bodyComposition} />
          <ExerciseList exercises={userData.exercises} />
        </div>
      </div>
      <div className="historical-data-section">
        <div className="selectors">
          <select value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="1 semana">1 semana</option>
            <option value="1 mes">1 mes</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
            <option value="1 año">1 año</option>
          </select>
          <select value={historicalType} onChange={handleHistoricalTypeChange}>
            <option value="peso">Histórico del peso</option>
            <option value="musculo">Histórico del músculo</option>
            <option value="grasa">Histórico del porcentaje de grasa corporal</option>
            <option value="agua">Histórico de la cantidad total de vasos de agua y litros totales tomados</option>
            <option value="pasos">Histórico de la cantidad total de pasos dados</option>
            <option value="ejercicios">Histórico de la cantidad total y duración total de ejercicios realizados</option>
          </select>
        </div>
        {/* No estoy seguro de porqué pero si quito el dailyStep del final en el userData deja de mostrar el grafico de line */}
        <HistoricalChart type={historicalType} period={timePeriod} data={dailySteps} />
      </div>
    </div>
  );
};
