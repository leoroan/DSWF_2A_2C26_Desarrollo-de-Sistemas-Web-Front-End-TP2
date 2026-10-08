/**
 * Información del equipo.
 *
 * IMPORTANTE: los datos personales NO fueron provistos por el equipo.
 * Cada integrante se declara con valores "PENDIENTE" para que la aplicación
 * funcione de punta a punta sin inventar información.
 * Reemplazar los campos marcados antes de publicar.
 */
export const team = {
  // Identidad editorial provisional: reemplazar por el nombre del equipo de TP1.
  name: 'Espacio de ideas',
  shortName: 'Espacio de ideas',
  description:
    'Un punto de encuentro para compartir lo que aprendemos, explorar herramientas y construir experiencias para la web.',
  course: 'Desarrollo de Sistemas Web Front End - TP2',
  repositoryUrl: 'PENDIENTE',
  demoUrl: 'PENDIENTE',
}

export const teamMembers = [
  {
    id: 'integrante-1',
    name: 'Leandro Maselli',
    role: 'Desarrollador backend',
    github: 'https://myselfproductions.me/DSWF_2A_2C26_Desarrollo-de-Sistemas-Web-Front-End-/',
    description: 'Desarrollador backend y estudiante de Desarrollo de Sistemas Web, interesado en construir soluciones web claras, mantenibles y funcionales.',
    technologies: ['HTML5 / CSS3', 'JavaScript (ES6)', 'Bootstrap 5.3', 'Node.js / Express', 'MySQL / Sequelize', 'MongoDB', 'Docker', 'Git / CI/CD', 'JWT / OAuth'],
    responsibilities: ['Trabajo en Equipo', 'Coordinación y liderazgo en proyectos ágiles'],
  },
  {
    id: 'integrante-2',
    name: 'Javier Canteros',
    role: 'Desarrollador de software',
    github: 'https://zirocool3.github.io/pfo1-CanterosJavier/',
    description: 'Desarrollador de software y estudiante de sistemas, con experiencia en desarrollo de aplicaciones de escritorio, APIs y aplicaciones móviles.',
    technologies: ['C#', 'Android Studio', '.Net Maui', 'HTML5 / CSS3', 'Bootstrap 5', 'Control de Versiones (Git)', 'MySQL', 'SQL Server', 'PHP'],
    responsibilities: ['Desarrollador colaborativo, experiencia en metodologías ágiles'],
  },
  {
    id: 'integrante-3',
    name: 'Maximiliano Quinteros',
    role: 'Estudiante de Desarrollo',
    github: 'https://github.com/Maxi22xT/Maximiliano-Quinteros-Front-End-IFST-29',
    description: 'Estudiante de Desarrollo en Software, apasionado autodidacta y amante de la tecnología.',
    technologies: ['HTML5 / CSS3', 'JavaScript (ES6)', 'Bootstrap 5.3', 'Git / GitHub'],
    responsibilities: ['Trabajo en equipo, versátil y ágil'],
  },
  {
    id: 'integrante-4',
    name: 'Damián Pelisare',
    role: 'Desarrollador Front-end',
    github: 'https://github.com/Damian-E/ifts_frontEnd',
    description: 'Estudiante de Desarrollo de Sistemas Web Front End, interesado en la tecnología, el diseño accesible y el trabajo en equipo.',
    technologies: ['HTML5 / CSS3', 'JavaScript (ES6)', 'Bootstrap 5.3', 'Control de Versiones (Git)'],
    responsibilities: ['Modelos de lenguaje, visión por computadora y agentes autónomos'],
  },
  {
    id: 'integrante-5',
    name: 'Nidia Elías',
    role: 'Estudiante de Desarrollo',
    github: 'https://github.com/nidia-elias/portfolio/',
    description: 'Estudiante de Desarrollo de Software y Profesora de Matemática, enfocada en aplicar la tecnología para resolver problemas reales.',
    technologies: ['HTML5 / CSS3', 'JavaScript (ES6)', 'PHP', 'C-SHARP', 'MySQL'],
    responsibilities: ['Adaptabilidad para la resolución de problemas'],
  },
]

/** Devuelve el integrante buscado o undefined si el id no existe. */
export function getMemberById(id) {
  return teamMembers.find((member) => member.id === id)
}
