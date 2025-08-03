import React, { useState, useEffect } from 'react';

const FlagDisplay = () => {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayedFlag, setDisplayedFlag] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Fetch the flag from the hidden URL
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a6561');
        const flagText = await response.text();
        setFlag(flagText);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flag:', error);
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!loading && flag && !animationStarted) {
      setAnimationStarted(true);
      
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex < flag.length) {
            setDisplayedFlag(flag.substring(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 500); // Half second delay between each character

      return () => clearInterval(interval);
    }
  }, [loading, flag, animationStarted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Flag:</h2>
      <ul>
        {displayedFlag.split('').map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default FlagDisplay; 