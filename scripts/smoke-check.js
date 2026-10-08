import React from "react";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/datos",
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;
Object.defineProperty(global, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
global.HTMLElement = dom.window.HTMLElement;
global.Event = dom.window.Event;
global.Node = dom.window.Node;
global.MouseEvent = dom.window.MouseEvent;
global.IS_REACT_ACT_ENVIRONMENT = true;

// Respuestas simuladas con la forma real de cada API.
const WEATHER_RESPONSE = {
  current_units: {
    temperature_2m: "°C",
    wind_speed_10m: "km/h",
    weather_code: "wmo code",
  },
  current: {
    time: "2026-09-29T12:45",
    temperature_2m: 16.6,
    wind_speed_10m: 22.6,
    weather_code: 3,
  },
};

const COUNTRY_RESPONSE = {
  data: {
    objects: [
      {
        names: { common: "Argentina", official: "República Argentina" },
        codes: { alpha_2: "AR", alpha_3: "ARG" },
        capitals: [{ name: "Buenos Aires" }],
        region: "Americas",
        subregion: "South America",
        area: { kilometers: 2780400, miles: 1073518 },
        timezones: ["UTC-03:00"],
        languages: [{ name: "Spanish", bcp47: "es" }],
        currencies: [{ code: "ARS", name: "Argentine peso", symbol: "$" }],
        population: 45808747,
        flag: { url_png: "https://flags.restcountries.com/v5/w640/ar.png" },
      },
    ],
    meta: { total: 1 },
  },
};

const SPAIN_RESPONSE = {
  data: {
    objects: [
      {
        names: { common: "Spain", official: "Kingdom of Spain" },
        codes: { alpha_2: "ES", alpha_3: "ESP" },
        capitals: [{ name: "Madrid" }],
        region: "Europe",
        subregion: "Southern Europe",
        area: { kilometers: 505990, miles: 195365 },
        timezones: ["UTC+01:00"],
        languages: [{ name: "Spanish", bcp47: "es" }],
        currencies: [{ code: "EUR", name: "Euro", symbol: "€" }],
        population: 47351567,
        flag: { url_png: "https://flags.restcountries.com/v5/w640/es.png" },
      },
    ],
    meta: { total: 1 },
  },
};

// Permite simular el fallo de una sola API sin romper la otra.
const failing = { weather: false, country: false, photo: false };

const PHOTO_RESPONSE = {
  data: {
    url: "https://images.unsplash.com/photo-test",
    autor: "Test Photographer",
    linkAutor: "https://unsplash.com/@test",
  },
};

global.fetch = async (url, options) => {
  const urlText = String(url);
  const isWeather = urlText.includes("open-meteo");
  const isPhoto = urlText.startsWith("/api/city-photo?");
  const key = isWeather ? "weather" : isPhoto ? "photo" : "country";

  if (failing[key]) {
    return { ok: false, status: 503, statusText: "Service Unavailable" };
  }

  if (isPhoto) {
    if (options?.headers?.Authorization || options?.headers?.["Client-ID"]) {
      throw new Error("El navegador debe consultar el proxy sin credenciales.");
    }
    const ciudad = new URL(urlText, "http://localhost").searchParams.get("ciudad");
    if (!ciudad) {
      throw new Error("El banner debe pedir la foto con la ciudad del integrante.");
    }
    return { ok: true, status: 200, json: async () => PHOTO_RESPONSE };
  }

  if (!isWeather) {
    if (
      !String(url).startsWith("/api/countries?") ||
      options?.headers?.Authorization
    ) {
      throw new Error("El navegador debe consultar el proxy sin credenciales.");
    }
    const countryId = new URL(url, "http://localhost").searchParams.get("q");
    return {
      ok: true,
      status: 200,
      json: async () => (countryId === "Spain" ? SPAIN_RESPONSE : COUNTRY_RESPONSE),
    };
  }

  return {
    ok: true,
    status: 200,
    json: async () => WEATHER_RESPONSE,
  };
};

const { render, screen, fireEvent, waitFor, cleanup } =
  await import("@testing-library/react");
const App = (await import("../src/App.jsx")).default;
const { default: records } = await import("../src/data/records.json");

let failures = 0;
const check = (label, condition, extra = "") => {
  if (!condition) failures += 1;
  console.log(
    `${condition ? "OK  " : "FAIL"} ${label}${extra ? " :: " + extra : ""}`,
  );
};

const renderApp = (path) => {
  dom.window.history.pushState({}, "", path);
  return render(React.createElement(App));
};

const shownCount = (container) =>
  container.innerHTML.match(/(\d+) de (\d+) registros mostrados/)?.[1];
// --- Sección /datos -------------------------------------------------------
const data = renderApp("/datos");
await waitFor(() => screen.getByText(/registros mostrados/));

check("Sidebar presente", data.container.innerHTML.includes("app-sidebar"));
check(
  "Marca la sección activa con NavLink",
  data.container.innerHTML.includes("sidebar__link--active"),
);
check(
  `Carga ${records.length} registros del JSON`,
  shownCount(data.container) === String(records.length),
);

const search = screen.getByLabelText("Buscar");
const categorySelect = screen.getByLabelText("Categoría");
const options = [...categorySelect.querySelectorAll("option")].map(
  (o) => o.value,
);
const uniqueCategories = new Set(records.map((r) => r.category)).size;

check(
  "Las categorías se generan desde el JSON",
  options.length === uniqueCategories + 1,
  `${options.length} opciones`,
);

fireEvent.change(search, { target: { value: "accesibilidad" } });
check(
  "Búsqueda textual filtra",
  shownCount(data.container) === "2",
  shownCount(data.container),
);

fireEvent.change(search, { target: { value: "eslint" } });
fireEvent.change(categorySelect, { target: { value: "Herramientas" } });
check(
  "Búsqueda y filtro combinados",
  shownCount(data.container) === "1",
  shownCount(data.container),
);

fireEvent.change(search, { target: { value: "zzz-no-existe" } });
check(
  'Informa "No se encontraron resultados."',
  data.container.innerHTML.includes("No se encontraron resultados."),
);

fireEvent.click(screen.getAllByRole("button", { name: "Limpiar filtros" })[0]);
check(
  "Limpiar filtros restaura la lista",
  shownCount(data.container) === String(records.length),
);
// --- Perfiles y rutas inválidas ------------------------------------------
const profile = renderApp("/integrantes/integrante-1");
await waitFor(() => profile.container.querySelector(".member-card"));
check(
  "Perfil individual renderiza",
  profile.container.innerHTML.includes("member-card"),
);
check(
  "Perfil ofrece volver al listado",
  profile.container.innerHTML.includes("/integrantes"),
);
check(
  "Perfil tiene interacción (desplegar detalles)",
  profile.container.innerHTML.includes("aria-expanded"),
);
await waitFor(() => profile.container.querySelector("#banner-ciudad"));
check(
  "Perfil muestra el banner de ciudad",
  profile.container.innerHTML.includes('id="banner-ciudad"'),
);
check(
  "Banner pide la foto sin credenciales y con crédito",
  profile.container.innerHTML.includes("photo-test") &&
    profile.container.innerHTML.includes("Foto por Test Photographer"),
);
// Sin servicio de fotos: el perfil sigue andando con respaldo local.
failing.photo = true;
const profileOffline = renderApp("/integrantes/integrante-2");
await waitFor(() => profileOffline.container.querySelector(".member-card"));
await waitFor(() => profileOffline.container.querySelector("#banner-ciudad"));
check(
  "Perfil funciona sin servicio de fotos (respaldo local)",
  profileOffline.container.innerHTML.includes("foto-respaldo.svg"),
);
failing.photo = false;
profileOffline.unmount();
profile.unmount();

const missing = renderApp("/integrantes/no-existe");
await waitFor(() => screen.getByText("Integrante no encontrado."));
check(
  "Integrante inexistente manejado",
  missing.container.innerHTML.includes("Volver a integrantes"),
);
missing.unmount();

// --- Sección /api: país elegido + clima de su capital ------------------------
const api = renderApp("/api");
await waitFor(() => screen.getByRole("heading", { name: "REST Countries: Argentina" }));
await waitFor(() => api.container.innerHTML.includes("Argentina (AR)"));
check(
  "Selector de país presente",
  api.container.innerHTML.includes('id="country-select"'),
);
check(
  "Open-Meteo renderiza el clima de la capital",
  api.container.innerHTML.includes("16.6"),
);
check(
  "Open-Meteo muestra la descripción del código",
  api.container.innerHTML.includes("Nublado"),
);
check(
  "Open-Meteo indica la capital elegida",
  api.container.textContent.includes("Buenos Aires"),
);
check(
  "REST Countries renderiza el país",
  api.container.innerHTML.includes("Argentina (AR)"),
);
check(
  "REST Countries muestra capital, región y población",
  api.container.innerHTML.includes("45.808.747"),
);
check(
  "REST Countries muestra la bandera",
  api.container.innerHTML.includes("w640/ar.png"),
);
check(
  "REST Countries muestra los cinco campos nuevos",
  [
    "South America",
    "2.780.400 km²",
    "UTC-03:00",
    "Spanish",
    "Argentine peso · ARS ($)",
  ].every((value) => api.container.textContent.includes(value)),
);
fireEvent.change(screen.getByLabelText("País"), { target: { value: "Spain" } });
await waitFor(() => screen.getByRole("heading", { name: "REST Countries: España" }));
check(
  "Cambiar el país actualiza REST Countries",
  api.container.innerHTML.includes("Spain (ES)"),
);
check(
  "Cambiar el país actualiza el clima a su capital",
  api.container.textContent.includes("Madrid"),
);
api.unmount();

// Error en una sola API: la otra debe seguir funcionando.
failing.weather = true;
const apiPartial = renderApp("/api");
await waitFor(() =>
  screen.getByText("No se pudo obtener la información meteorológica."),
);
check(
  "Open-Meteo maneja estado error",
  apiPartial.container.innerHTML.includes("Reintentar"),
);
check(
  "El error de Open-Meteo no rompe REST Countries",
  apiPartial.container.innerHTML.includes("Argentina (AR)"),
);
apiPartial.unmount();

// Reintento de REST Countries
failing.weather = false;
failing.country = true;
const apiRetry = renderApp("/api");
await waitFor(() =>
  screen.getByText("No se pudo obtener la información del país."),
);
check(
  "REST Countries maneja estado error",
  apiRetry.container.innerHTML.includes("Reintentar"),
);
check(
  "El error de REST Countries no rompe Open-Meteo",
  apiRetry.container.innerHTML.includes("16.6"),
);
failing.country = false;
fireEvent.click(screen.getAllByRole("button", { name: "Reintentar" })[0]);
await waitFor(() => screen.getByText("Argentina (AR)"));
check(
  "Reintento vuelve a consultar REST Countries",
  apiRetry.container.innerHTML.includes("45.808.747"),
);
apiRetry.unmount();

// --- Árbol, bitácora, IA y 404 -------------------------------------------
const tree = renderApp("/arbol");
await waitFor(() => screen.getByText(/Jerarquía real de componentes/));
check("Árbol muestra el nodo App", tree.container.innerHTML.includes(">App<"));
check(
  "Árbol es interactivo con details",
  tree.container.innerHTML.includes("<details"),
);
tree.unmount();

const log = renderApp("/bitacora");
await waitFor(() => screen.getByRole("heading", { name: "Bitácora" }));
check(
  "Bitácora con entradas expandibles",
  log.container.querySelectorAll(".changelog-entry details").length > 0,
);
check(
  "Bitácora agrupada en 4 etapas",
  log.container.querySelectorAll(".changelog-stage").length === 4,
);
check(
  "Bitácora muestra aporte por integrante",
  log.container.innerHTML.includes("Aporte por integrante") &&
    log.container.innerHTML.includes("Leandro Maselli") &&
    log.container.innerHTML.includes("Nidia Elias"),
);
check(
  "Bitácora sin PENDIENTE",
  !log.container.innerHTML.includes("PENDIENTE"),
);
log.unmount();
// --- Portada / -----------------------------------------------------------
const home = renderApp("/");
await waitFor(() => home.container.querySelector(".member-card"));
check(
  "Portada presenta al equipo (TeamIntro)",
  home.container.innerHTML.includes("team-intro-title"),
);
check(
  "Portada lista integrantes con enlace al perfil",
  home.container.innerHTML.includes("/integrantes/integrante-1"),
);
check(
  "Portada enlaza a otras secciones",
  home.container.innerHTML.includes('href="/datos"'),
);
home.unmount();

cleanup();

const ai = renderApp("/ia");
await waitFor(() => screen.getByText("Uso de IA por integrante"));
check(
  "IA distingue aplicación de modelo",
  ai.container.innerHTML.includes("Aplicación") &&
    ai.container.innerHTML.includes("Modelo"),
);
ai.unmount();

const nf = renderApp("/no-existe");
await waitFor(() => screen.getByText("Página no encontrada"));
check(
  "Ruta inexistente muestra 404",
  nf.container.innerHTML.includes("Volver a la portada"),
);
nf.unmount();

cleanup();
console.log(
  failures === 0 ? "\nTODAS LAS COMPROBACIONES OK" : `\n${failures} FALLOS`,
);
process.exit(failures === 0 ? 0 : 1);

check(
  "Detalle expandible por registro",
  data.container.querySelector(".data-card summary") !== null,
);
check(
  "El detalle muestra description/details",
  data.container.querySelector(".data-card__details") !== null,
);
data.unmount();
