require("dotenv").config();
const fetch = require("node-fetch");
const telegram = require("node-telegram-bot-api");
const Telegram = require("node-telegram-bot-api");
const bot = new Telegram(process.env.TELEGRAM_TOKEN);

const weatherToken = process.env.WEATHER_API_TOKEN;

const weatherURL = new URL("https://api.openweathermap.org/data/2.5/weather");
weatherURL.searchParams.set("zip", "28205,de");
weatherURL.searchParams.set("APPID", weatherToken);
weatherURL.searchParams.set("units", "metric");

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString());
  const body = await resp.json();
  return body;
};

const generateWeatherMessage = (wd) =>
  `The weather in ${wd.name}: ${wd.weather[0].description}. Current temperature is ${wd.main.temp}, with a low temp of ${wd.main.temp_min} and a high of ${wd.main.temp_max}.`;

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherString = generateWeatherMessage(weatherData);
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
};

main();
