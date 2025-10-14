import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface ForecastChartProps {
  data: { name: string; price: number | null; forecast: number | null }[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const lastHistoricalDataIndex = data.findIndex(d => d.forecast !== null) - 1;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E9ECEF" />
        <XAxis dataKey="name" stroke="#6C757D" tick={{ fontSize: 12 }} />
        <YAxis 
          stroke="#6C757D"
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
          domain={['dataMin', 'dataMax']}
        />
        <Tooltip
          contentStyle={{
             backgroundColor: '#FFFFFF',
            borderColor: '#E9ECEF',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: '#212529' }}
          formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name.charAt(0).toUpperCase() + name.slice(1)]}
        />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#007BFF" strokeWidth={2} dot={false} name="Historical Price" />
        <Line type="monotone" dataKey="forecast" stroke="#D4AF37" strokeWidth={2} strokeDasharray="5 5" dot={false} name="AI Forecast" />
        {lastHistoricalDataIndex >= 0 && (
          <ReferenceLine x={data[lastHistoricalDataIndex].name} stroke="#6C757D" strokeDasharray="3 3" label={{ value: 'Today', position: 'insideTop', fill: '#6C757D' }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastChart;