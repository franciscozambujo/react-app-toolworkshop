import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function mainPage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchData();
  }, []);

  return(
    
    



    <h1 className="text-7xl">MAIN</h1>
  )
}
