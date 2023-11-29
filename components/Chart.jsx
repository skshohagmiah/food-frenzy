'use client'
import { useState } from 'react';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const Chart = () => {
  const [data, setData] = useState([
    { day: 'Mon', orders: 30 },
    { day: 'Tue', orders: 45 },
    { day: 'Wed', orders: 60 },
    { day: 'Thu', orders: 20 },
    { day: 'Fri', orders: 35 },
    { day: 'Sat', orders: 50 },
    { day: 'Sun', orders: 40 },
  ]);

  const handleClick = () => {
    const newData = [
      { day: 'Mon', orders: 25 },
      { day: 'Tue', orders: 40 },
      { day: 'Wed', orders: 55 },
      { day: 'Thu', orders: 15 },
      { day: 'Fri', orders: 30 },
      { day: 'Sat', orders: 45 },
      { day: 'Sun', orders: 35 },
    ];

    setData(newData);
  };

  return (
    <div className="bg-white text-center shadow-md w-full rounded-lg p-4">
      <h2 className="text-2xl p-2 font-bold">Weekly Order Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Update Data
      </button>
    </div>
  );
};

export default Chart;
