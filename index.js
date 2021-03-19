import * as yahoo from "https://deno.land/x/yahoo_stock_prices@0.0.1/yahoo-stock-prices.js";

const ticker = [
  "GME",
  "AMC",
];

const log = (message, ...data) =>
  console.log(`[${new Date().toISOString()}]: ${message}`, ...data);

const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const MAX_PER_HOUR = 2000;
const SECONDS_PER_HOUR = 3600;

const interval = SECONDS_PER_HOUR / (MAX_PER_HOUR / ticker.length) * 1000 /
  ticker.length;

const lastPrice = new Map();

const updatePriceAndGetPrintout = (symbol, price) => {
  const lastValue = lastPrice.get(symbol) || price;
  lastPrice.set(symbol, price)
  const output = `${symbol}: ${price}`.padEnd(11, ' ');
  const emoji = price > lastValue ? '🚀' : price < lastValue ? '💎👐' : '😐';
  return `${output} ${emoji}`.padEnd(19, ' ');
};

while (true) {
  await Promise.all(
    ticker.map(symbol => yahoo.getCurrentPrice(symbol))
  ).then((prices) => {
    const outputs = ticker.map(
      (symbol, index) => updatePriceAndGetPrintout(symbol, prices[index])
    );
    log(outputs.join(''))
  }).catch((err) => log(`Error fetching: ${symbol}`, err));

  await wait(interval * ticker.length);
}
