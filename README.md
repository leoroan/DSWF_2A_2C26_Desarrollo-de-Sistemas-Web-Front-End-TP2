# Espacio de ideas - TP2 DSWF

Aplicación web desarrollada en **React** con **Vite** y **React Router**. Presenta al
equipo y organiza su información en secciones navegables: portada, integrantes con perfiles
individuales y foto de su ciudad, datos locales con búsqueda y filtro, consulta a APIs
públicas (país + clima de su capital), árbol de componentes, bitácora por etapas y
declaración de uso de IA.

## Demo

[Ver aplicación](URL_PENDIENTE)

## Índice

- [Descripción](#descripción)
- [Demo](#demo)
- [Integrantes](#integrantes)
- [Funcionalidades](#funcionalidades)
- [Uso de IA](#uso-de-ia)
- [APIs utilizadas](#apis-utilizadas)
- [Deploy](#deploy)
- [Instalación local](#instalación-local)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Capturas](#capturas)

## Integrantes

La misma información está en `src/data/team.js` y se muestra en `/integrantes`.

### Leandro Maselli

- GitHub: `https://myselfproductions.me/DSWF_2A_2C26_Desarrollo-de-Sistemas-Web-Front-End-/`
- Ciudad: La Plata, Argentina
- Responsabilidad: Estructura del proyecto, proxies de APIs sin exponer claves, page `/api` unificada y scripts de verificación.

### Javier Canteros

- GitHub: `https://zirocool3.github.io/pfo1-CanterosJavier/`
- Ciudad: Resistencia, Chaco, Argentina
- Responsabilidad: Estilos base, identidad visual inicial y tarjetas de API.

### Maximiliano Quinteros

- GitHub: `https://github.com/Maxi22xT/Maximiliano-Quinteros-Front-End-IFST-29`
- Ciudad: Córdoba, Argentina
- Responsabilidad: Perfil personal y revisión de datos del equipo.

### Damián Pelisare

- GitHub: `https://github.com/Damian-E/ifts_frontEnd`
- Ciudad: Buenos Aires, Argentina
- Responsabilidad: Portada del equipo y revisión de perfiles.

### Nidia Elías

- GitHub: `https://github.com/nidia-elias/portfolio/`
- Ciudad: Mar de Ajo, La Costa, Argentina
- Responsabilidad: Banner de ciudad por perfil (FondoCiudad) y variable `city` en `team.js`.

## Funcionalidades

- **Navegación React Router** con layout común y sidebar compartida.
- **Sidebar responsive**: en desktop siempre visible; en viewport pequeño se convierte en
  panel desplegable con botón de apertura/cierre. Marca la sección activa con `NavLink`.
- **Portada del equipo** (`/`) con presentación y acceso a integrantes.
- **Perfiles individuales** (`/integrantes/:id`), con banner de foto de la ciudad
  del integrante (Unsplash vía proxy `/api/city-photo`, con respaldo local),
  detalle desplegable y manejo de id inexistente.
- **Datos locales JSON** (`src/data/records.json`, 24 registros) renderizados dinámicamente,
  con detalle expandible por registro.
- **Búsqueda textual** y **filtro por categoría** combinables, con mensaje de
  "No se encontraron resultados." y botón "Limpiar filtros".
- **Selector de país + clima de su capital** (`/api`): REST Countries (datos) y
  Open-Meteo (temperatura), con estados `loading` / `success` / `error`
  independientes y reintento. Open-Meteo no requiere clave; las de REST Countries
  y Unsplash viven solo en el servidor.
- **Árbol de componentes** de la jerarquía real, interactivo y expandible.
- **Bitácora por etapas** (`/bitacora`): 4 etapas con período, aporte por integrante
  y línea de tiempo expandible, desde `src/data/changelog.json`.
- **Declaración de uso de IA** (`/ia`) por integrante, distinguiendo aplicación y modelo.

## Uso de IA

La misma tabla se muestra en la sección `/ia` y se alimenta desde `src/data/ai-usage.js`.
Es una propuesta coherente con el trabajo registrado en git: cada integrante debe validar
la herramienta y el modelo exactos antes de la entrega.

| Integrante | Aplicación | Modelo | Uso |
| ---------- | ---------- | ------ | --- |
| Leandro Maselli | Asistente IA integrado al IDE (Muse Spark) | Modelo del asistente (validar versión exacta) | Proxies `/api/countries` y `/api/city-photo` sin exponer claves, `/api` unificada país + clima, fix de Vercel y scripts de verificación. |
| Javier Canteros | Asistente IA integrado al IDE (Muse Spark) | Modelo del asistente (validar versión exacta) | Estilos base, tarjetas de API y chequeos iniciales del proxy de países. |
| Nidia Elías | Asistente IA integrado al IDE (Muse Spark) | Modelo del asistente (validar versión exacta) | Banner FondoCiudad, servicio de fotos y variable `city` en `team.js`. |
| Damián Pelisare | Asistente IA integrado al IDE (Muse Spark) | Modelo del asistente (validar versión exacta) | Portada del equipo y revisión de perfiles. |
| Maximiliano Quinteros | Asistente IA integrado al IDE (Muse Spark) | Modelo del asistente (validar versión exacta) | Perfil personal y prueba de navegación. |

**Aclaración de conceptos:** *aplicación* es la herramienta utilizada y *modelo* es el
modelo concreto empleado en esa herramienta.

## APIs utilizadas

La sección `/api` usa un único selector de país: muestra la información del
país (REST Countries) y la temperatura actual de su capital (Open-Meteo).
Cada consulta tiene sus propios estados de carga y error, y un error en una
no afecta a la otra.

### Open-Meteo

Se utiliza para consultar la temperatura actual de la capital del país
elegido, mediante coordenadas geográficas fijas por país
(`src/services/restCountries.js`).

Devuelve temperatura actual, velocidad del viento y código meteorológico.

Sitio: https://open-meteo.com/

No requiere API key. Servicio: `src/services/openMeteo.js`.

### REST Countries

Se utiliza para consultar información básica de países (nombre, capital, región,
población y bandera), con un selector sencillo de países.

Sitio: https://restcountries.com/

Servicio: `src/services/restCountries.js`.

**Configuración de la clave.** Copiar `.env.example` a `.env.local` y completar
`REST_COUNTRIES_API_KEY`. Este archivo está excluido de Git. Reiniciar Vite después
de cambiarlo. No usar el prefijo `VITE_`: la clave debe permanecer en el servidor.

React consulta `/api/countries?q=Argentina`. La función `api/countries.js` agrega
`Authorization: Bearer ...` y consulta REST Countries v5. La misma función se usa
en desarrollo, en la previsualización local y en Vercel. Solo admite los países
del selector, limita la espera a diez segundos y devuelve errores sin credenciales.

> Ruta `/api` (página React) ≠ endpoint `/api/countries` (proxy servidor).
> La página vive en `src/pages/PublicApi/`; el proxy vive en `api/countries.js`
> y solo existe para no exponer la clave en el navegador.

En Vercel, agregar `REST_COUNTRIES_API_KEY` y `UNSPLASH_ACCESS_KEY` en
Settings → Environment Variables para los entornos deseados y volver a
desplegar. Sin esas variables, la interfaz mostrará el estado de error
con la opción de reintentar (país) o la imagen local de respaldo (foto).

Referencia: [funciones Node.js de Vercel](https://vercel.com/docs/functions/runtimes/node-js).

### Unsplash (foto de ciudad por integrante)

El perfil (`/integrantes/:id`) muestra un banner con una foto de la ciudad
declarada en `src/data/team.js` (`teamMembers[].city`).

Sitio: https://unsplash.com/developers

Servicio: `src/services/fondo.js`. El navegador consulta
`/api/city-photo?ciudad=...` sin credenciales; `api/city-photo.js` agrega
la clave en el servidor. Sin `UNSPLASH_ACCESS_KEY` o si Unsplash falla,
se usa `/foto-respaldo.svg` local.
## Deploy

- URL de producción: `URL_PENDIENTE`
- Plataforma prevista: Vercel.
- El archivo `vercel.json` reescribe todo a `index.html` excepto `/api/*`,
  para que las rutas profundas puedan abrirse directamente sin romper
  el proxy de países en producción.

## Instalación local

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción en dist/
npm run lint       # análisis estático con ESLint
npm run test:smoke # smoke test funcional (renderizado, búsqueda, filtro, API)
npm run check:apis # consulta las APIs reales para verificar los servicios
npm run check:proxy # verifica el proxy /api/countries sin exponer la clave
npm run check:fields # verifica campos v5 y normalización del servicio país
npm run check:photo # verifica el proxy /api/city-photo y el respaldo local
npm run check:all # corre los cuatro chequeos anteriores
npm run verify    # lint + smoke + checks + build
npm run preview    # previsualiza el build de producción
```

El smoke test (`scripts/smoke-check.js`) monta la aplicación en un entorno jsdom y
verifica, entre otras cosas: la sidebar y la sección activa, los 24 registros del JSON,
la búsqueda, el filtro combinado, el mensaje de sin resultados, el reset, los perfiles
(válido con banner de ciudad, respaldo sin fotos e inexistente), los estados
`success` y `error` de la API, el reintento, el árbol, la bitácora y la página 404.
La API se simula con `fetch` para no depender de la red.

## Estructura del proyecto

```text
src/
├── components/
│   ├── api/{WeatherCard,CountryCard}.jsx
│   ├── common/PageHeader.jsx
│   ├── data/{DataCard,DataList,SearchInput,FilterSelect}.jsx
│   ├── layout/{AppLayout,Sidebar,FondoCiudad}.jsx
│   ├── team/{TeamIntro,MemberCard,MemberList}.jsx
│   └── tree/ComponentTree.jsx
├── data/{team.js,navigation.js,records.json,changelog.json,ai-usage.js,componentTree.js}
├── pages/{Home,Members,MemberProfile,Data,PublicApi,ComponentTree,Changelog,AiUsage,NotFound}
│   └── Changelog/Changelog.css (timeline por etapas)
├── services/{openMeteo.js,restCountries.js,fondo.js}
├── router/router.jsx
├── App.jsx
└── main.jsx
api/{countries.js,city-photo.js}  # proxies servidor (Vercel Functions)
scripts/{smoke-check,check-apis,check-countries-proxy,check-country-fields,check-city-photo}.js
public/foto-respaldo.svg
```

## Capturas

Pendiente de agregar.

## Pendientes para el equipo

- [ ] Cada integrante debe validar su fila de Uso de IA (`src/data/ai-usage.js`): herramienta y modelo exactos.
- [ ] Definir URL de demo y completar el enlace en `src/data/team.js` (`demoUrl`) y en este README.
- [ ] Publicar el repositorio y verificar acceso sin autenticación (criterio 1).
- [ ] Invitar a todos los integrantes y verificar que aceptaron la invitación (criterio 3).
- [ ] Aplicar la identidad visual definitiva (criterio 9, fuera del alcance de esta base).


