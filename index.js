import * as yahoo from 'https://deno.land/x/yahoo_stock_prices@0.0.1/yahoo-stock-prices.js'
import { Application } from "https://deno.land/x/abc@v1.2.4/mod.ts";

const log = (message, ...data) => console.log(`[${new Date().toISOString()}]: ${message}`, ...data)

const app = new Application();

console.log("http://localhost:8080/");

app
  .get("/:stock", async (c) => {
    const price = await yahoo.getCurrentPrice(c.params.stock);
    log(`${c.params.stock}: $${price}`);
    return {price};
  })
  .start({ port: 8080 });
