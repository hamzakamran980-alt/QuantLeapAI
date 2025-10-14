import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AllocationChartProps {
  data: { name: string; value: number }[];
  onPieClick?: (payload: any) => void;
}

const COLORS = ['#007BFF', '#D4AF37', '#28A745', '#FFC107', '#DC3545', '#6F42C1', '#fd7e14', '#20c997', '#6610f2'];

const AllocationChart: React.FC<AllocationChartProps> = ({ data, onPieClick }) => {
  const chartData = data.filter(d => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip
          formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
          contentStyle={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E9ECEF',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{ color: '#212529' }}
          itemStyle={{ color: '#212529' }}
        />
        <Legend iconType="circle" />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          onClick={onPieClick}
          className={onPieClick ? 'cursor-pointer' : ''}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AllocationChart;