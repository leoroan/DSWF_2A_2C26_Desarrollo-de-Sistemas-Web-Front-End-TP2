/**
 * Declaración de uso de IA por integrante.
 *
 * PROPUESTA coherente con el trabajo registrado en git (ver /bitacora):
 * cada entrada vincula al integrante con la parte del proyecto donde el
 * asistente de IA apoyó su tarea. Cada integrante debe validar y precisar
 * la herramienta y el modelo exactos antes de la entrega.
 *
 * "Aplicación" es la herramienta utilizada y "modelo" el modelo concreto.
 */
export const aiUsage = [
  {
    id: "ia-leandro",
    member: "Leandro Maselli",
    application: "Asistente IA integrado al IDE (Muse Spark)",
    model: "muse-spark-1.3",
    task: "Diseño de los proxies /api/countries y /api/city-photo sin exponer claves, unificación de /api con país + clima en paralelo, corrección del rewrite de Vercel y scripts de verificación.",
  },
  {
    id: "ia-javier",
    member: "Javier Canteros",
    application: "IDE de Codex",
    model: "chatgpt-sol",
    task: "Estilos base del proyecto, tarjetas de API (WeatherCard/CountryCard) y chequeos iniciales del proxy de países.",
  },
  {
    id: "ia-nidia",
    member: "Nidia Elías",
    application: "Aplicacion web de DeepSeek",
    model: "deepseek-4.1-flash",
    task: "Banner FondoCiudad por integrante, servicio de fotos de ciudad y variable city en team.js.",
  },
  {
    id: "ia-damian",
    member: "Damián Pelisare",
    application: "IDE de Codex",
    model: "chatgpt-sol",
    task: "Portada del equipo, carga de datos personales en team.js y revisión de perfiles.",
  },
  {
    id: "ia-maxi",
    member: "Maximiliano Quinteros",
    application: "Antigravity AI",
    model: "Gemini 3.8",
    task: "Perfil personal, revisión de datos del equipo y prueba de navegación entre secciones.",
  },
];
