import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import classes from "./MainChart.module.css";
import { useSelector } from "react-redux";
import loadingSpinner from "../../../../../images/loadingSpinner.png";

const MainChart = () => {
  let lineColor;
  /**
   * This is an Array with historical data. Every item in this array is also an array which contains time or date at the index [0] and price at the index [1]
   */
  const { activeCryptoHistoricalData: historicalData } = useSelector(
    (state) => state.applicationData
  );
  const { fetchingHistoricalDataStatus: loadingStatus } = useSelector(
    (state) => state.taskStatus
  );
  const { activeCrypto } = useSelector((state) => state.applicationData);

  const showNotification = !activeCrypto ? true : false;

  if (loadingStatus?.status === "success") {
    lineColor =
      historicalData[historicalData.length - 1][1] > historicalData[0][1]
        ? "rgba(166, 233, 139, 0.667)"
        : "rgba(250, 77, 77, 0.767)";
  }

  return (
    <section className={classes.mainPanelChartContainer}>
      {showNotification && (
        <p className={classes.mainPanelChart__notification}>
          No chart available
        </p>
      )}
      {loadingStatus?.status === "failed" && (
        <p className={classes.mainPanelChart__notification}>
          Problem with internet connection!
        </p>
      )}
      {loadingStatus?.status === "loading" && (
        <div className={classes.spinnerWrapper}>
          <img className={classes.loadingSpinner} src={loadingSpinner}></img>
        </div>
      )}
      {loadingStatus?.status === "success" && activeCrypto && (
        <Chart
          type="line"
          data={{
            labels: historicalData.map((item) => item[0]),
            datasets: [
              {
                fill: false,
                label: "",
                data: historicalData.map((item) => item[1]),
              },
            ],
          }}
          options={{
            scales: {
              xAxes: {
                ticks: {
                  maxTicksLimit: 15,
                },
              },
            },
            elements: {
              line: {
                borderColor: lineColor,
              },
              point: {
                radius: 1,
                hoverRadius: 7,
                borderColor: lineColor,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      )}
    </section>
  );
};

export default MainChart;
