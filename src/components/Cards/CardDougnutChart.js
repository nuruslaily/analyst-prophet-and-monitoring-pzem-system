import React from "react";
import Chart from "chart.js";

export default function CardDougnutChart() {
  React.useEffect(() => {
    let config = {
      type: "doughnut",
      data: {
        labels: [
          'W',
          'Hz'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [75, 25],
          backgroundColor: [
            'rgba(47, 128, 237, 1)',
            '#1C4D8E',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        datalabels: {
          display: true,
          font: {
            fontColor: 'white',
            size: 18,
          }
        },
      }
    };
    let ctx = document.getElementById("doughnut1-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Power and Frequency
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="doughnut1-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
