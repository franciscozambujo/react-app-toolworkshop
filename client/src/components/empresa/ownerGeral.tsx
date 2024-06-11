import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

interface RepairData {
    semana: string;
    reparacoes: number;
}

export function OwnerGeralMain() {
const [reparacoesUltimaSemana, setReparacoesUltimaSemana] = useState<RepairData[]>([]);

  useEffect(() => {
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
    chartArea: {
        'backgroundColor': {
            'fill': '#53AE6E',
            'opacity': 100
        },
    },
    legend: 'none',
    colors: ['#53AE6E'],
  };
  return (
    <div>
      {reparacoesUltimaSemana.length > 0 && (
        <Chart
            chartType="Bar"
            data={chartData}
            options={options}
        />
      )}
    </div>
  );
}