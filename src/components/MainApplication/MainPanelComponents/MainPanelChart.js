import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import classes from "./MainPanelChart.module.css";
const MainPanelChart = () => {
  return (
    <section className={classes.mainPanelChartContainer}>
      <Chart
        type="line"
        data={{
          labels: [
            "1.01",
            "1.02",
            "1.03",
            "4.04",
            "1.01",
            "1.02",
            "1.03",
            "4.04",
          ],
          datasets: [
            {
              label: "",
              data: [10, 12, 15, 20, 14, 19, 9, 11],
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
