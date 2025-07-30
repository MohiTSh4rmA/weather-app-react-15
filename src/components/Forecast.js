import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function Forecast({ data }) {
  const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);

  const chartData = {
    labels: daily.map(d => d.dt_txt.split(" ")[0]),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: daily.map(d => d.main.temp),
        borderColor: '#007bff',
        tension: 0.3
      }
    ]
  };

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <Line data={chartData} />
    </div>
  );
}

export default Forecast;
