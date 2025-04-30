import React, { useState, useEffect } from 'react';
import { ReactionResult } from '../utils/api';

const Results: React.FC = () => {
  const [results, setResults] = useState<ReactionResult[]>([]);

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem('reactionResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (results.length === 0) {
    return <p>No results yet</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Results</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Reaction Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{result.age}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{result.reactionTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results; 