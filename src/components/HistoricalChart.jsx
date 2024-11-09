import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './HistoricalChart.css'

// eslint-disable-next-line react/prop-types
const HistoricalChart = ({ userId, metricType, timeRange }) => {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  const formatLabel = (dateStr) => {
    if (timeRange === '1w') {
      return dateStr
    } else if (['1m', '3m'].includes(timeRange)) {
      const [year, week] = dateStr.split('-')
      return `Week ${week}, ${year}`
    } else {
      const [year, month] = dateStr.split('-')
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short' 
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/historical/${userId}?metric_type=${metricType}&time_range=${timeRange}`
        )
        const data = await response.json()
        
        if (metricType === 'exercise') {
          setChartData(data.dates.map((date, index) => ({
            date: formatLabel(date),
            'Total Exercise Count': Math.round(data.dates.map(date => {
              const dayData = data.data[date]
              return dayData.exercises.reduce((total, ex) => total + ex.count, 0)
            })[index] * 100) / 100,
            'Duration (minutes)': Math.round(data.data[date].total_duration * 100) / 100
          })))
        } else {
          setChartData(data.dates.map((date, index) => ({
            date: formatLabel(date),
            [getMetricLabel(metricType)]: Math.round(data.values[index] * 100) / 100
          })))
        }
      } catch (error) {
        console.error('Error fetching historical data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, metricType, timeRange])

  const getMetricLabel = (type) => {
    const labels = {
      weight: 'Promedio Peso (kg)',
      muscle: 'Promedio Masa Muscular (%)',
      fat: 'Promedio de Grasa (%)',
      water: 'Promedio Litros',
      steps: 'Promedio Pasos'
    }
    return labels[type] || type
  }

  if (loading) return <div className="loading">Loading...</div>
  if (chartData.length === 0) return <div className="no-data">No data available</div>

  const dataKeys = Object.keys(chartData[0]).filter(key => key !== 'date')

  return (
    <div className="historical-chart">
      <div className="chart-container">
        <h2 className="chart-title">{`Datos Históricos del ${getMetricLabel(metricType)} `}</h2>
        <p className="chart-description">Seguimiento de su progreso a lo largo del tiempo</p>
        <div className="chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={index === 0 ? "#3b82f6" : "#10b981"}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default HistoricalChart