import { createServer } from "node:http";
import { loadEnv } from "vite";
import { countriesHandler } from "../api/countries.js";

const env = loadEnv("development", process.cwd(), "REST_COUNTRIES_");
const server = createServer((req, res) =>
  countriesHandler(req, res, env.REST_COUNTRIES_API_KEY),
);
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const nativeFetch = global.fetch;
// Ejecuta el servicio del navegador contra el handler real, con URL absoluta en Node.
global.fetch = (url, options) =>
  nativeFetch(
    String(url).startsWith("/api/countries")
      ? `http://127.0.0.1:${server.address().port}${url}`
      : url,
    options,
  );
// Prueba de los servicios contra las APIs reales (no usa el DOM).
const { getWeather } = await import("../src/services/openMeteo.js");
const { getCountry } = await import("../src/services/restCountries.js");

const fail = (msg) => {
  console.log("FAIL " + msg);
  process.exitCode = 1;
};

try {
  const { getCountryOption } = await import("../src/services/restCountries.js");
  const ottawa = getCountryOption("Canada");
  const w = await getWeather({
    name: ottawa.capital,
    latitude: ottawa.latitude,
    longitude: ottawa.longitude,
  });
  const ok =
    typeof w.temperature === "number" &&
    typeof w.windSpeed === "number" &&
    typeof w.weatherCode === "number" &&
    typeof w.description === "string" &&
    typeof w.time === "string";
  console.log(
    (ok ? "OK  " : "FAIL") + " Open-Meteo real -> " + JSON.stringify(w),
  );
  if (!ok) fail("Open-Meteo devuelve datos incompletos");
} catch (error) {
  fail("Open-Meteo real: " + error.message);
}

for (const country of ["Canada"]) {
  try {
    const c = await getCountry(country);
    const ok = typeof c.name === "string" && typeof c.capital === "string";
    console.log(
      (ok ? "OK  " : "FAIL") +
        ` REST Countries real (${country}) -> ${c.name} | capital=${c.capital} | region=${c.region} | pob=${c.population} | flag=${Boolean(c.flag)}`,
    );
    if (!ok) fail("REST Countries devuelve datos incompletos");
  } catch (error) {
    fail(`REST Countries real (${country}): ` + error.message);
  }
}

server.close();
global.fetch = nativeFetch;
