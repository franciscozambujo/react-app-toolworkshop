import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

export function OwnerGeralMain() {
    const [reparacoesUltimaSemana, setReparacoesUltimaSemana] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3000/repairsLastWeek')
        .then((response) => response.json())
        .then((responseData) => {
        setReparacoesUltimaSemana(responseData[0].reparacoes_ultima_semana);
        });
    }, []);
  return (
    <div className="">
        <div>
            <Chart
                chartType="LineChart"
                data={[[reparacoesUltimaSemana]]}
                options={{
                    title: 'Reparações na Última Semana',
                    hAxis: { title: 'Reparação' },
                }}
            />
        </div>
    </div>
  );
}
