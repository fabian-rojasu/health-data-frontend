/* eslint-disable react/prop-types */

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './BodyComposition.css';


const BodyComposition = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="body-composition">
      <h3 className="composition-title">Composición Corporal</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BodyComposition;