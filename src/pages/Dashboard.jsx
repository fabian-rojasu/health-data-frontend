import StatCard from "../components/StatCard";
import ExerciseList from "../components/ExerciseList";
import BodyComposition from "../components/BodyComposition";
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
    </div>
  );
};
