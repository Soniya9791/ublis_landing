import { useEffect, useState } from 'react';

function CountdownComponent({ successState }) {
  const [successnumber, setsuccessnumber] = useState(5); // Initial countdown value

  useEffect(() => {
    if (successState) {
      const interval = setInterval(() => {
        setsuccessnumber((prevNumber) => {
          if (prevNumber > 0) {
            return prevNumber - 1; // Decrease the number by 1 every second
          } else {
            clearInterval(interval); // Clear interval when countdown reaches 0
            return 0;
          }
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [successState]);

  return (
    <>{successnumber}</>
  );
}

export default CountdownComponent;
