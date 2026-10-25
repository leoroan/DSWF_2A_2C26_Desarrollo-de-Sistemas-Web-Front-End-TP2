/**
 * Información del equipo.
 *
 * Cada integrante se declara con valores "PENDIENTE" para que la aplicación
 * funcione de punta a punta sin inventar información.
 * Reemplazar los campos marcados antes de publicar.
 */
export const team = {
  // Identidad editorial provisional: reemplazar por el nombre del equipo de TP1.
  name: "Espacio de ideas",
  shortName: "Espacio de ideas",
  description:
    "Un punto de encuentro para compartir lo que aprendemos, explorar herramientas y construir experiencias para la web.",
  course: "Desarrollo de Sistemas Web Front End - TP2",
  repositoryUrl: "PENDIENTE",
  demoUrl: "PENDIENTE",
};

export const teamMembers = [
  {
    id: "integrante-1",
    name: "Leandro Maselli",
    role: "Desarrollador backend",
    city: "La Plata, Argentina",
    github:
      "https://myselfproductions.me/DSWF_2A_2C26_Desarrollo-de-Sistemas-Web-Front-End-/",
    description:
      "Desarrollador backend y estudiante de Desarrollo de Sistemas Web, interesado en construir soluciones web claras, mantenibles y funcionales.",
    technologies: [
      "HTML5 / CSS3",
      "JavaScript (ES6)",
      "Bootstrap 5.3",
      "Node.js / Express",
      "MySQL / Sequelize",
      "MongoDB",
      "Docker",
      "Git / CI/CD",
      "JWT / OAuth",
    ],
    responsibilities: [
      "Inicialización del proyecto: navegacion, records.json, team.js, router con todas las paginas,<br>servicios Open-Meteo y REST Countries, y config de Vite y Vercel.",
      "Integración de servicios externos: Conexión con las APIs de Open-Meteo (datos meteorológicos)<br>y REST Countries (información de países)."
    ],
  },
  {
    id: "integrante-2",
    name: "Javier Canteros",
    role: "Desarrollador de software",
    city: "Resistencia, Chaco, Argentina",
    github: "https://zirocool3.github.io/pfo1-CanterosJavier/",
    description:
      "Desarrollador de software y estudiante de sistemas, con experiencia en desarrollo de aplicaciones de escritorio, APIs y aplicaciones móviles.",
    technologies: [
      "C#",
      "Android Studio",
      ".Net Maui",
      "HTML5 / CSS3",
      "Bootstrap 5",
      "Control de Versiones (Git)",
      "MySQL",
      "SQL Server",
      "PHP",
    ],
    responsibilities: [
      "Definición de estilos base:<br>Creación de la base visual y los estilos generales de la aplicación.",
      "Identidad visual:<br>Establecimiento y documentación de la identidad visual inicial en el archivo de diseño (Docs/diseno.md).",
      "Ajustes técnicos:<br>Configuración y correcciones en el proxy de países para su correcto funcionamiento.",
      "Base de estilos de tarjetas de API y chequeos iniciales del proxy de paises."
    ],
  },
  {
    id: "integrante-3",
    name: "Maximiliano Quinteros",
    role: "Estudiante de Desarrollo",
    city: "Cordoba, Argentina",
    github:
      "https://github.com/Maxi22xT/Maximiliano-Quinteros-Front-End-IFST-29",
    description:
      "Estudiante de Desarrollo en Software, apasionado autodidacta y amante de la tecnología.",
    technologies: [
      "HTML5 / CSS3",
      "JavaScript (ES6)",
      "Bootstrap 5.3",
      "Git / GitHub",
    ],
    responsibilities: [
      "Aportación de su información personal dentro de los datos del equipo.",
      "Desarrollo y actualización de la bitácora de trabajo grupal (changelog.json),<br>asegurando la coherencia con el desarrollo de las etapas anteriores."
    ],
  },
  {
    id: "integrante-4",
    name: "Damián Pelisare",
    role: "Desarrollador Front-end",
    city: "Buenos Aires, Argentina",
    github: "https://github.com/Damian-E/ifts_frontEnd",
    description:
      "Estudiante de Desarrollo de Sistemas Web Front End, interesado en la tecnología, el diseño accesible y el trabajo en equipo.",
    technologies: [
      "HTML5 / CSS3",
      "JavaScript (ES6)",
      "Bootstrap 5.3",
      "Control de Versiones (Git)",
    ],
    responsibilities: [
      "Desarrollo de la interfaz: Completó la sección de la portada del equipo.",
      "Gestión de datos: Añadió y configuró su información personal dentro del archivo team.js."
    ],
  },
  {
    id: "integrante-5",
    name: "Nidia Elías",
    role: "Estudiante de Desarrollo",
    city: "Mar de Ajo, La Costa, Argentina",
    github: "https://nidia-elias.github.io/portfolio/",
    description:
      "Estudiante de Desarrollo de Software y Profesora de Matemática, enfocada en aplicar la tecnología para resolver problemas reales.",
    technologies: [
      "HTML5 / CSS3",
      "JavaScript (ES6)",
      "PHP",
      "C-SHARP",
      "MySQL",
    ],
    responsibilities: [
      "Componentes y servicios: Desarrollo del servicio de fotos para la función,<br>creación del fondo de ciudad en los perfiles y creación del componente FondoCiudad.",
      "Configuración de datos: Adición y gestión de la variable city<br>dentro del archivo de configuración del equipo (team.js)."
    ],
  },
];

/** Devuelve el integrante buscado o undefined si el id no existe. */
export function getMemberById(id) {
  return teamMembers.find((member) => member.id === id);
}
