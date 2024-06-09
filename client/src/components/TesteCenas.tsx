import { useState, useEffect } from 'react';

export function TesteCenas () {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://react-app-toolworkshop-server.vercel.app/');
      const data = await response.json();
      setData(data[0].name);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>{data}</p>
    </div>
  );
};