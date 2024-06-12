import { TokenContext } from '@/data/AuthProvider';
import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'react-google-charts';

interface RepairData {
    semana: string;
    reparacoes: number;
}

export function OwnerGeralMain() {
const [reparacoesUltimaSemana, setReparacoesUltimaSemana] = useState<RepairData[]>([]);
const { token, login, logout } = useContext(TokenContext);

  /*useEffect(() => {
    fetch('http://localhost:3000/repairsLastWeek')
     .then((response) => response.json())
     .then((responseData) => {
        setReparacoesUltimaSemana(responseData);
      });
  }, []);

  const chartData = [
    ['Semana', 'Reparações'],
   ...reparacoesUltimaSemana.map((item) => [item.semana, item.reparacoes]),
  ];

  const options = {
    width: 1000,
    height: 600,
    title: 'Reparações por Semana',
    hAxis: { 
        title: 'Semana',
        ticks: [1, 2, 3, 4, 5],
     },
    vAxis: { title: 'Quantidade de Reparações' },
    colors: ['#53AE6E'],
  };*/

  useEffect(() => {
    if (token) {
      fetch('http://localhost:3000/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }, [token]);

  return (
    <div>
    </div>
  );
}