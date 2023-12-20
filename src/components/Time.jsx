import React, { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className="sm:text-9xl text-6xl font-mono mx-auto">{time}</div>;
}
