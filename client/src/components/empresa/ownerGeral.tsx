import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

interface BarChartData {
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
}

interface XAxisData {
  categories: string[];
}

interface TotalValueChartData {
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
}

interface TotalValueXAxisData {
  categories: string[];
}

export function OwnerGeralMain() {
  const [BarChartData, setBarChartData] = useState<BarChartData | null>(null);
  const [xAxisData, setXAxisData] = useState<XAxisData | null>(null);
  const [totalValueChartData, setTotalValueChartData] = useState<TotalValueChartData | null>(null);
  const [totalValueXAxisData, setTotalValueXAxisData] = useState<TotalValueXAxisData | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');

  const fetchData = async (year: string) => {
    try {
      const responseRepairs = await fetch(`http://localhost:3000/repairsPerMonthByYear?year=${year}`);
      const dataRepairs = await responseRepairs.json();
      if (dataRepairs) {
        setBarChartData({
          series: [{
            name: "Reparações",
            data: dataRepairs.map((item: { reparacoes: number }) => item.reparacoes),
            color: '#53AE6E',
          }]
        });
        setXAxisData({
          categories: dataRepairs.map((item: { mes: number}) => item.mes),
        });
      } else {
        console.error('No data received from API');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTotalValueData = async (year: string) => {
    try {
      const response = await fetch(`http://localhost:3000/totalValueRepairsPerMonth?year=${year}`);
      const data = await response.json();
      if (data) {
        setTotalValueChartData({
          series: [
            {
              name: "Valor Total no mês de ",
              data: data.map((item: { valor_total: number }) => item.valor_total),
              color: '#FFC500',
            }
          ],
        });
        setTotalValueXAxisData({
          categories: data.map((item: { mes: number}) => item.mes),
        });
      } else {
        console.error('No data received from API');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setBarChartData(null);
    setXAxisData(null);
    fetchData(selectedYear);
    fetchTotalValueData(selectedYear);
  }, [selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  if (!BarChartData || !xAxisData || !totalValueChartData || !totalValueXAxisData) {
    return null;
  }

  const OptionsBarChart = {
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
    chart: {
      foreColor: 'dark',
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    noData: {
      text: "Sem reparações feitas",
    },
    yaxis: {
      title: {
        text: "Quantidade de Reparações"
      },
      min: 0, 
      max: 20, 
      tickAmount: 10,
    },
    xaxis: {
      categories: xAxisData.categories,
    },
  };

  const OptionsTotalValueChart = {
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
    noData: {
      text: "Sem reparações feitas",
    },
    chart: {
      foreColor: 'dark',
      toolbar: {
        show: false,
      },
      fontFamily: 'Inter, sans-serif',
    },
    yaxis: {
      title: {
        text: "Valor Total"
      },
      min: 0, 
      max: 10000, 
      tickAmount: 10,
      labels: {
        show: false,
        formatter: function(val: number) {
          return val.toFixed(2) + " €";
        }
      },
    },
    dataLabels: {
      formatter: function(val: number) {
        return val.toFixed(2) + " €";
      },
    },
    xaxis: {
      categories: totalValueXAxisData.categories,
      axisTicks: {
        show: true,
       },
    },
  };

  return (
    <div className="flex justify-around pt-16 font-bodyfooter">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center">
          <span className="pr-4">Ano</span>
          <select className="bg-[#292929] border rounded-sm" value={selectedYear} onChange={handleYearChange}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div className="flex item-center justify-between gap-x-48 gap-y-16">
          <div className="w-[550px] h-[325px] bg-white text-black border-4 border-white rounded-md">
            <span className="font-bodyfooter pb-6">Reparações feitas por mês</span>
            <Chart
              options={OptionsBarChart}
              series={BarChartData.series}
              type="bar"
              width="530px"
              height="300px"
            />
          </div>
          <div className="w-[625px] h-[325px] bg-white text-black border-4 border-white rounded-md">
            <span className="font-bodyfooter pb-6">Valor total de reparações por mês</span>
            <Chart
              options={OptionsTotalValueChart}
              series={totalValueChartData.series}
              type="area"
              width="600px"
              height="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};