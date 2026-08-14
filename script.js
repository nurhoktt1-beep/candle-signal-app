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

  candleSeries = chart.addCandlestickSeries({
    upColor: "#20e889",
    downColor: "#ff5577",
    borderUpColor: "#20e889",
    borderDownColor: "#ff5577",
    wickUpColor: "#20e889",
    wickDownColor: "#ff5577"
  });

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

    const close =
      open + movement;

    const high =
      Math.max(open, close) +
      Math.random() * 0.0015;

    const low =
      Math.min(open, close) -
      Math.random() * 0.0015;

    candles.push({
      time: now - (80 - i) * 60,
      open: open,
      high: high,
      low: low,
      close: close
    });

    price = close;
  }

  return candles;
}


/* Market */

document.getElementById("market")
  .addEventListener("change", function () {

    const market =
      this.options[this.selectedIndex].text;

    document.getElementById(
      "selectedMarket"
    ).textContent = market;

    createChart();
  });


/* Timeframe */

document.getElementById("timeframe")
  .addEventListener("change", function () {

    const timeframe =
      this.options[this.selectedIndex].text;

    document.getElementById(
      "selectedTimeframe"
    ).textContent = timeframe;

    createChart();
  });


/* Responsive chart */

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
