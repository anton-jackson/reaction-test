import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactionTest from './components/ReactionTest';
import ReactionTestMobile from './components/ReactionTestMobile';
import Results from './components/Results';
import AdminView from './components/AdminView';
import { isMobileDevice } from './utils/deviceDetection';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set mobile state after component mounts to avoid hydration mismatch
    setIsMobile(isMobileDevice());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route index element={isMobile ? <ReactionTestMobile /> : <ReactionTest />} />
        <Route path="results" element={<Results />} />
        <Route path="admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
};

export default App; 