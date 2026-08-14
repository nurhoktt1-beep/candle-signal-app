const chartElement = document.getElementById("chart");

const chart = LightweightCharts.createChart(chartElement, {
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
    timeVisible: true
  }
});

const candleSeries = chart.addSeries(
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

const candles = [
  { time: 1755000000, open: 1.0840, high: 1.0860, low: 1.0830, close: 1.0855 },
  { time: 1755000060, open: 1.0855, high: 1.0870, low: 1.0845, close: 1.0865 },
  { time: 1755000120, open: 1.0865, high: 1.0875, low: 1.0840, close: 1.0845 },
  { time: 1755000180, open: 1.0845, high: 1.0855, low: 1.0825, close: 1.0830 },
  { time: 1755000240, open: 1.0830, high: 1.0850, low: 1.0820, close: 1.0845 },
  { time: 1755000300, open: 1.0845, high: 1.0870, low: 1.0840, close: 1.0865 },
  { time: 1755000360, open: 1.0865, high: 1.0880, low: 1.0850, close: 1.0875 },
  { time: 1755000420, open: 1.0875, high: 1.0880, low: 1.0845, close: 1.0850 },
  { time: 1755000480, open: 1.0850, high: 1.0860, low: 1.0825, close: 1.0835 },
  { time: 1755000540, open: 1.0835, high: 1.0855, low: 1.0825, close: 1.0850 },
  { time: 1755000600, open: 1.0850, high: 1.0880, low: 1.0840, close: 1.0870 },
  { time: 1755000660, open: 1.0870, high: 1.0890, low: 1.0860, close: 1.0885 }
];

candleSeries.setData(candles);

chart.timeScale().fitContent();

window.addEventListener("resize", () => {
  chart.applyOptions({
    width: chartElement.clientWidth,
    height: chartElement.clientHeight
  });
});
