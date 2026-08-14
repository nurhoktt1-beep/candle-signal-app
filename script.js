const chartElement = document.getElementById("chart");

let chart;
let candleSeries;

function createChart() {

  chartElement.innerHTML = "";

  chart = LightweightCharts.createChart(chartElement, {
    width: chartElement.clientWidth,
    height: chartElement.clientHeight,

    layout: {
      background: {
        type: "solid",
        color: "#101622"
      },
      textColor: "#b8c2d4"
    },

    grid: {
      vertLines: {
        color: "#242d3d"
      },
      horzLines: {
        color: "#242d3d"
      }
    },

    rightPriceScale: {
      borderColor: "#293448"
    },

    timeScale: {
      borderColor: "#293448",
      timeVisible: true,
      secondsVisible: false
    }
  });

  candleSeries = chart.addSeries(
    LightweightCharts.CandlestickSeries,
    {
      upColor: "#20e889",
      downColor: "#ff5577",
      borderUpColor: "#20e889",
      borderDownColor: "#ff5577",
      wickUpColor: "#20e889",
      wickDownColor: "#ff5577"
    }
  );

  const data = [];

  let price = 1.08500;

  // Fixed minute-based timestamps
  const startTime =
    Math.floor(Date.now() / 60000) * 60 - (80 * 60);

  for (let i = 0; i < 80; i++) {

    const open = price;

    const change =
      (Math.random() - 0.5) * 0.0020;

    const close = open + change;

    const high =
      Math.max(open, close) +
      Math.random() * 0.0008;

    const low =
      Math.min(open, close) -
      Math.random() * 0.0008;

    data.push({
      time: startTime + (i * 60),
      open: Number(open.toFixed(5)),
      high: Number(high.toFixed(5)),
      low: Number(low.toFixed(5)),
      close: Number(close.toFixed(5))
    });

    price = close;
  }

  candleSeries.setData(data);

  chart.timeScale().fitContent();
}


/* Market */

document.getElementById("market").addEventListener(
  "change",
  function () {

    document.getElementById("selectedMarket").textContent =
      this.options[this.selectedIndex].text;

    createChart();
  }
);


/* Timeframe */

document.getElementById("timeframe").addEventListener(
  "change",
  function () {

    document.getElementById("selectedTimeframe").textContent =
      this.options[this.selectedIndex].text;

    createChart();
  }
);


/* Resize */

window.addEventListener("resize", function () {

  if (chart) {
    chart.resize(
      chartElement.clientWidth,
      chartElement.clientHeight
    );
  }

});


/* Start */

createChart();
