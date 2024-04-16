import React, { useState, useEffect } from 'react';


export function TesteGet(){
    const [employees, setEmployees] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/employees');
            const data = await response.json();
            setEmployees(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);
    
    return(
        <div>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.user}
                {employee.nome}
                {employee.telemovel}
                {employee.cargo}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading employees...</p>
        )}
      </div>
    )
}