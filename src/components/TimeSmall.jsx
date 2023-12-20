import React, { useState, useEffect } from "react";

function TimeSmall() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-mono text-4xl">
      {time.getHours()}
      <span className="animate-pulse">:</span>
      {time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}
    </div>
  );
}

export default TimeSmall;
