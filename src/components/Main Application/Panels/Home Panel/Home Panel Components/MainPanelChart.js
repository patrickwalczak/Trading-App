import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import classes from "./MainPanelChart.module.css";
import { useSelector } from "react-redux";
const MainPanelChart = () => {
  const { activeCryptoHistoricalData } = useSelector(
    (state) => state.applicationData
  );

  return (
    <section className={classes.mainPanelChartContainer}>
      <Chart
        type="line"
        data={{
          labels: activeCryptoHistoricalData.map((item) => item[0]),
          datasets: [
            {
              label: "",
              data: activeCryptoHistoricalData.map((item) => item[1]),
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </section>
  );
};

export default MainPanelChart;
