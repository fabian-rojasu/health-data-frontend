/* eslint-disable react/prop-types */

import './StatCard.css';

const StatCard = ({ title, value, unit, icon: Icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h3 className="stat-title">{title || 'N/A'}</h3>
        {Icon && <Icon className="stat-icon" />}
      </div>
      <div className="stat-value">
        <span className="value">{value ?? 'N/A'}</span>
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;