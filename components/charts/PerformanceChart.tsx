import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceChartProps {
  data: { name: string; [key: string]: number | string }[];
  dataKey: string;
  dataName: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, dataKey, dataName }) => {
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
          formatter={(value: number) => [`$${value.toLocaleString()}`, dataName]}
        />
        <Legend />
        <Line type="monotone" dataKey={dataKey} name={dataName} stroke="#007BFF" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;