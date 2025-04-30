import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactionTest from './components/ReactionTest';
import Results from './components/Results';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<ReactionTest />} />
        <Route path="results" element={<Results />} />
        <Route path="admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
};

export default App; 