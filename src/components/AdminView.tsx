import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getResultsUrl } from '../utils/api';
import { ReactionResult } from '../utils/s3';

// Register Chart.js components
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const AdminView: React.FC = () => {
  const [results, setResults] = useState<ReactionResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getResultsUrl());
        const csvText = await response.text();
        
        // Parse CSV (skip header row)
        const rows = csvText.split('\n').slice(1);
        const parsedResults = rows
          .filter(row => row.trim()) // Skip empty rows
          .map(row => {
            const [timestamp, age, reactionTime] = row.split(',');
            return {
              timestamp,
              age,
              reactionTime: Number(reactionTime)
            };
          });
        
        setResults(parsedResults);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    datasets: [
      {
        label: 'Reaction Times by Age',
        data: results.map(result => ({
          x: Number(result.age),
          y: result.reactionTime
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Age'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Reaction Time (ms)'
        }
      }
    },
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const result = results[context.dataIndex];
            return `Age: ${result.age}, Time: ${result.reactionTime}ms`;
          }
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h1>Reaction Time Results</h1>
      <div style={{ marginTop: '20px' }}>
        <Scatter data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminView; 