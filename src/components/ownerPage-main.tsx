import { Chart } from "react-google-charts";

export function OwnerPageMain(){
    return (
        <div>
        <h1>Dono</h1>
        <Chart
            chartType="ScatterChart"
            data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
            width="100%"
            height="400px"
            legendToggle
        />
        </div>
    )
}