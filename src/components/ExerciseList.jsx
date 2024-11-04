/* eslint-disable react/prop-types */

import './ExerciseList.css';

const ExerciseList = ({ exercises }) => {
  return (
    <div className="exercise-list">
      <h3 className="exercise-title">Ejercicios del día</h3>
      <div className="exercise-items">
        {exercises.map((exercise, index) => (
          <div key={index} className="exercise-item">
            <span className="exercise-name">{exercise.name}</span>
            <span className="exercise-duration">{exercise.duration} min</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;