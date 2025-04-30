import React, { useState, useEffect, useCallback } from 'react';
import { saveResult, getResultsUrl } from '../utils/api';

const ReactionTest: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [stage, setStage] = useState<'input' | 'instructions' | 'waiting' | 'react' | 'result'>('input');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space' && stage === 'react' && startTime) {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setStage('result');
      
      // Save result
      setSaveStatus('saving');
      saveResult({
        age: age,
        reactionTime: reaction,
      })
        .then(success => {
          setSaveStatus(success ? 'saved' : 'error');
        })
        .catch(() => {
          setSaveStatus('error');
        });
    }
  }, [stage, startTime, age]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (stage === 'waiting') {
      const timer = setTimeout(() => {
        setStage('react');
        setStartTime(Date.now());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleStart = () => {
    if (age.trim() === '') return;
    setStage('instructions');
  };

  const handleRestart = () => {
    setAge('');
    setStage('input');
    setStartTime(null);
    setReactionTime(null);
  };

  const handleInstructionsComplete = () => {
    setStage('waiting');
  };

  const containerStyle = {
    height: '100vh',
    backgroundColor: stage === 'react' ? 'red' : 'white',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle = {
    fontSize: '24px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    fontSize: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const inputStyle = {
    fontSize: '20px',
    padding: '10px',
    marginBottom: '20px',
    width: '200px',
  };

  const linkStyle = {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '16px',
  };

  return (
    <div style={containerStyle}>
      {stage === 'input' && (
        <div style={{ textAlign: 'center' }}>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            style={inputStyle}
          />
          <br />
          <button onClick={handleStart} style={buttonStyle}>
            Start Test
          </button>
          <div style={{ marginTop: '20px' }}>
            <a 
              href={getResultsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
            >
              View All Results
            </a>
            <div style={{ marginTop: '10px' }}>
              <a 
                href="#/admin" 
                style={linkStyle}
              >
                Admin View
              </a>
            </div>
          </div>
        </div>
      )}

      {stage === 'instructions' && (
        <div style={{ textAlign: 'center', maxWidth: '80%' }}>
          <p style={textStyle}>Once these instructions go away, wait until the screen turns red, then hit the space bar to stop the timer.</p>
          <button onClick={handleInstructionsComplete} style={buttonStyle}>
            I understand
          </button>
        </div>
      )}

      {stage === 'waiting' && (
        <div style={{ textAlign: 'center' }}>
          <p style={textStyle}>Wait for the screen to turn red</p>
        </div>
      )}

      {stage === 'react' && (
        <div style={{ textAlign: 'center' }}>
          <p style={textStyle}>Press Space Bar NOW!</p>
        </div>
      )}

      {stage === 'result' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ ...textStyle, fontSize: '32px' }}>
            Your Reaction Time: {reactionTime !== null ? `${reactionTime}ms` : 'Error measuring time'}
          </p>
          {saveStatus === 'saving' && <p style={textStyle}>Saving result...</p>}
          {saveStatus === 'saved' && <p style={textStyle}>Result saved!</p>}
          {saveStatus === 'error' && <p style={{ ...textStyle, color: 'red' }}>Error saving result</p>}
          <button onClick={handleRestart} style={buttonStyle}>
            Try Again
          </button>
          <div style={{ marginTop: '20px' }}>
            <a 
              href={getResultsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
            >
              View All Results
            </a>
            <div style={{ marginTop: '10px' }}>
              <a 
                href="#/admin" 
                style={linkStyle}
              >
                Admin View
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionTest; 