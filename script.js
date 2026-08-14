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
      textColor: "#9aa6ba"
    },

    grid: {
      vertLines: {
        color: "#1b2433"
      },
      horzLines: {
        color: "#1b2433"
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

  candleSeries.setData(generateDemoCandles());

  chart.timeScale().fitContent();
}


/* Demo candles */

function generateDemoCandles() {

  const candles = [];

  let price = 1.0850;

  const now = Math.floor(Date.now() / 1000);

  for (let i = 0; i < 80; i++) {

    const open = price;

    const movement =
      (Math.random() - 0.5) * 0.004;

    const close = open + movement;

    const high =
      Math.max(open, close) +
      Math.random() * 0.0015;

    const low =
      Math.min(open, close) -
      Math.random() * 0.0015;

    candles.push({
      time: now - (80 - i) * 60,
      open: Number(open.toFixed(5)),
      high: Number(high.toFixed(5)),
      low: Number(low.toFixed(5)),
      close: Number(close.toFixed(5))
    });

    price = close;
  }

  return candles;
}


/* Market change */

document.getElementById("market")
  .addEventListener("change", function () {

    document.getElementById("selectedMarket")
      .textContent =
      this.options[this.selectedIndex].text;

    createChart();
  });


/* Timeframe change */

document.getElementById("timeframe")
  .addEventListener("change", function () {

    document.getElementById("selectedTimeframe")
      .textContent =
      this.options[this.selectedIndex].text;

    createChart();
  });


/* Resize */

window.addEventListener("resize", function () {

  if (chart) {

    chart.applyOptions({
      width: chartElement.clientWidth,
      height: chartElement.clientHeight
    });

  }

});


/* Start */

createChart();
