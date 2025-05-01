import React, { useState, useEffect, useCallback, useRef } from 'react';
import { saveResult, getResultsUrl } from '../utils/api';

const ReactionTestMobile: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [stage, setStage] = useState<'input' | 'instructions' | 'waiting' | 'react' | 'result'>('input');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const instructionsRef = useRef<HTMLDivElement>(null);

  const handleTouch = useCallback(() => {
    if (stage === 'react' && startTime) {
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
    if (stage === 'waiting') {
      const timer = setTimeout(() => {
        setStage('react');
        setStartTime(Date.now());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'instructions' && instructionsRef.current) {
      instructionsRef.current.focus();
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
    minHeight: '100vh',
    backgroundColor: stage === 'react' ? 'red' : 'white',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    touchAction: 'manipulation',
  };

  const textStyle = {
    fontSize: '20px',
    marginBottom: '20px',
    textAlign: 'center' as const,
  };

  const buttonStyle = {
    fontSize: '18px',
    padding: '15px 30px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007AFF',
    color: 'white',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '10px',
  };

  const inputStyle = {
    fontSize: '18px',
    padding: '12px',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  };

  const linkStyle = {
    color: '#007AFF',
    textDecoration: 'none',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '16px',
    padding: '10px',
  };

  return (
    <div style={containerStyle} onTouchStart={stage === 'react' ? handleTouch : undefined}>
      {stage === 'input' && (
        <div style={{ width: '100%', maxWidth: '300px', textAlign: 'center' as const }}>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            style={inputStyle}
          />
          <button onClick={handleStart} style={buttonStyle}>
            Start Test
          </button>
          <div>
            <a 
              href={getResultsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
            >
              View All Results
            </a>
            <div>
              <a 
                href="#/admin" 
                style={linkStyle}
              >
                Results Graph View
              </a>
            </div>
          </div>
        </div>
      )}

      {stage === 'instructions' && (
        <div 
          ref={instructionsRef}
          style={{ 
            textAlign: 'center',
            width: '100%',
            maxWidth: '300px',
          }}
        >
          <p style={textStyle}>
            Once these instructions go away, wait until the screen turns red, then tap anywhere on the screen to stop the timer.
          </p>
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
          <p style={textStyle}>Tap anywhere NOW!</p>
        </div>
      )}

      {stage === 'result' && (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '300px' }}>
          <p style={{ ...textStyle, fontSize: '28px' }}>
            Your Reaction Time: {reactionTime !== null ? `${reactionTime}ms` : 'Error measuring time'}
          </p>
          {saveStatus === 'saving' && <p style={textStyle}>Saving result...</p>}
          {saveStatus === 'saved' && <p style={textStyle}>Result saved!</p>}
          {saveStatus === 'error' && <p style={{ ...textStyle, color: 'red' }}>Error saving result</p>}
          <button onClick={handleRestart} style={buttonStyle}>
            Try Again
          </button>
          <div>
            <a 
              href={getResultsUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              style={linkStyle}
            >
              View All Results
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactionTestMobile; 