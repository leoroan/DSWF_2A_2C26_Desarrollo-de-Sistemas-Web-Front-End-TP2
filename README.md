# PENDIENTE - Nombre del proyecto (TP2 DSWF)

> **Este README contiene placeholders.** Los datos marcados como `PENDIENTE` deben ser
> completados por el equipo antes de la entrega. No se inventaron nombres, usuarios de
> GitHub, URLs de despliegue ni herramientas de IA.

## Descripción

Aplicación web desarrollada en **React** con **Vite** y **React Router**. Presenta al
equipo y organiza su información en secciones navegables: portada, integrantes con perfiles
individuales, datos locales con búsqueda y filtro, consulta a una API pública, árbol de
componentes, bitácora del proyecto y declaración de uso de IA.

## Demo

[Ver aplicación](URL_PENDIENTE)

## Índice

- [Descripción](#descripción)
- [Demo](#demo)
- [Integrantes](#integrantes)
- [Funcionalidades](#funcionalidades)
- [Uso de IA](#uso-de-ia)
- [Deploy](#deploy)
- [Instalación local](#instalación-local)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Capturas](#capturas)

## Integrantes

> Completar con los datos reales del equipo. La misma información está en `src/data/team.js`.

### Nombre Apellido

- GitHub: `URL_PENDIENTE`
- Responsabilidad: PENDIENTE

### Nombre Apellido

- GitHub: `URL_PENDIENTE`
- Responsabilidad: PENDIENTE

### Nombre Apellido

- GitHub: `URL_PENDIENTE`
- Responsabilidad: PENDIENTE

## Funcionalidades

- **Navegación React Router** con layout común y sidebar compartida.
- **Sidebar responsive**: en desktop siempre visible; en viewport pequeño se convierte en
  panel desplegable con botón de apertura/cierre. Marca la sección activa con `NavLink`.
- **Portada del equipo** (`/`) con presentación y acceso a integrantes.
- **Perfiles individuales** (`/integrantes/:id`), páginas React reales con detalle
  desplegable y manejo de id inexistente.
- **Datos locales JSON** (`src/data/records.json`, 24 registros) renderizados dinámicamente,
  con detalle expandible por registro.
- **Búsqueda textual** y **filtro por categoría** combinables, con mensaje de
  "No se encontraron resultados." y botón "Limpiar filtros".
- **Dos APIs públicas reales**: Open-Meteo (clima) y REST Countries (países), con
  estados `loading` / `success` / `error` y botón de actualizar/reintento independientes.
  Open-Meteo no requiere clave; la de REST Countries se configura por variable de entorno.
- **Árbol de componentes** de la jerarquía real, interactivo y expandible.
- **Bitácora** del proceso de desarrollo.
- **Declaración de uso de IA** por integrante, distinguiendo aplicación y modelo.

## Uso de IA

> Completar con la información real. La misma tabla se muestra en la sección `/ia` de la
> aplicación y se alimenta desde `src/data/ai-usage.js`.

| Integrante | Aplicación | Modelo | Uso |
| ---------- | ---------- | ------ | --- |
| PENDIENTE  | PENDIENTE  | PENDIENTE | PENDIENTE |
| PENDIENTE  | PENDIENTE  | PENDIENTE | PENDIENTE |
| PENDIENTE  | PENDIENTE  | PENDIENTE | PENDIENTE |

**Aclaración de conceptos:** *aplicación* es la herramienta utilizada (por ejemplo, un
chat de IA) y *modelo* es el modelo concreto empleado en esa herramienta.

## APIs utilizadas

La sección `/api` consume dos APIs públicas reales, cada una con su propio servicio,
sus estados de carga y error, y su botón de actualizar/reintentar. Un error en una
no afecta a la otra.

### Open-Meteo

Se utiliza para consultar información meteorológica mediante coordenadas geográficas.
Devuelve temperatura actual, velocidad del viento y código meteorológico de Buenos Aires.

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

React consulta `/api/countries?q=Canada`. La función `api/countries.js` agrega
`Authorization: Bearer ...` y consulta REST Countries v5. La misma función se usa
en desarrollo, en la previsualización local y en Vercel. Solo admite los países
del selector, limita la espera a diez segundos y devuelve errores sin credenciales.

En Vercel, agregar `REST_COUNTRIES_API_KEY` en Settings → Environment Variables
para los entornos deseados y volver a desplegar. Sin esa variable, la interfaz
mostrará el estado de error con la opción de reintentar.

Referencia: [funciones Node.js de Vercel](https://vercel.com/docs/functions/runtimes/node-js).
## Deploy

- URL de producción: `URL_PENDIENTE`
- Plataforma prevista: Vercel.
- El archivo `vercel.json` incluye la reescritura de rutas hacia `index.html`, necesaria
  para que las rutas profundas (por ejemplo `/datos` o `/integrantes/integrante-1`) puedan
  abrirse directamente.

## Instalación local

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción en dist/
npm run lint       # análisis estático con ESLint
npm run test:smoke # smoke test funcional (renderizado, búsqueda, filtro, API)
npm run check:apis # consulta las APIs reales para verificar los servicios
npm run preview    # previsualiza el build de producción
```

El smoke test (`scripts/smoke-check.js`) monta la aplicación en un entorno jsdom y
verifica, entre otras cosas: la sidebar y la sección activa, los 24 registros del JSON,
la búsqueda, el filtro combinado, el mensaje de sin resultados, el reset, los perfiles
(válido e inexistente), los estados `success` y `error` de la API, el reintento, el árbol,
la bitácora y la página 404. La API se simula con `fetch` para no depender de la red.

## Estructura del proyecto

```text
src/
├── components/
│   ├── api/{WeatherCard,CountryCard}.jsx
│   ├── common/PageHeader.jsx
│   ├── data/{DataCard,DataList,SearchInput,FilterSelect}.jsx
│   ├── layout/{AppLayout,Sidebar}.jsx
│   ├── team/{TeamIntro,MemberCard,MemberList}.jsx
│   └── tree/ComponentTree.jsx
├── data/{team.js,navigation.js,records.json,changelog.json,ai-usage.js,componentTree.js}
├── pages/{Home,Members,MemberProfile,Data,PublicApi,ComponentTree,Changelog,AiUsage,NotFound}
├── services/{openMeteo.js,restCountries.js}
├── router/router.jsx
├── App.jsx
└── main.jsx
```

## Capturas

Pendiente de agregar.

## Pendientes para el equipo

- [ ] Completar datos del equipo en `src/data/team.js` y en la sección Integrantes de este README.
- [ ] Completar `src/data/ai-usage.js` y la tabla de Uso de IA.
- [ ] Completar las fechas reales de `src/data/changelog.json`.
- [ ] Publicar el repositorio y verificar acceso sin autenticación (criterio 1).
- [ ] Invitar a todos los integrantes y verificar que aceptaron la invitación (criterio 3).
- [ ] Aplicar la identidad visual definitiva (criterio 9, fuera del alcance de esta base).


