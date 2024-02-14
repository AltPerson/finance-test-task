"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

let FETCH_INTERVAL = 5000;
let timer = null;
let isTracking = true;
const PORT = process.env.PORT || 4000;

let tickers = [
  "AAPL", // Apple
  "GOOGL", // Alphabet
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "FB", // Facebook
  "TSLA", // Tesla
];

let excludedTickers = [];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {
  let quotes = tickers.map((ticker) => ({
    ticker,
    exchange: "NASDAQ",
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  if (excludedTickers.length > 0) {
    excludedTickers.forEach((exTicker) => {
      quotes = quotes.filter((quote) => {
        return quote.ticker !== exTicker;
      });
    });
  }

  socket.emit("ticker", quotes);
}

function trackTickers(socket, isTracking) {
  if (timer) clearInterval(timer);
  if (!isTracking) return;

  getQuotes(socket);

  // every N seconds
  timer = setInterval(function () {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on("disconnect", function () {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket, isTracking);
  });
  socket.on("getSettings", () => {
    socket.emit("getSettings", {
      interval: FETCH_INTERVAL,
      tickersArray: tickers,
      isTracking,
    });
  });
  socket.on("setSettings", (params) => {
    excludedTickers = [...params.tickersArray];
    FETCH_INTERVAL = params.interval;
    trackTickers(socket, params.isTracking);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
