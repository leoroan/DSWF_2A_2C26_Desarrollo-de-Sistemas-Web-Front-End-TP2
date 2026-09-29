/**
 * Información del equipo.
 *
 * IMPORTANTE: los datos personales NO fueron provistos por el equipo.
 * Cada integrante se declara con valores "PENDIENTE" para que la aplicación
 * funcione de punta a punta sin inventar información.
 * Reemplazar los campos marcados antes de publicar.
 */
export const team = {
  name: 'PENDIENTE - Nombre del equipo',
  shortName: 'Equipo PENDIENTE',
  description:
    'PENDIENTE - Descripción breve del equipo (PENDIENTE). La aplicación React del TP2 organiza la información del equipo en secciones navegables.',
  course: 'Desarrollo de Sistemas Web Front End - TP2',
  repositoryUrl: 'PENDIENTE',
  demoUrl: 'PENDIENTE',
}

export const teamMembers = [
  {
    id: 'integrante-1',
    name: 'PENDIENTE',
    role: 'PENDIENTE',
    github: '',
    description: 'PENDIENTE - Completar por el equipo.',
    technologies: [],
    responsibilities: ['PENDIENTE'],
  },
  {
    id: 'integrante-2',
    name: 'PENDIENTE',
    role: 'PENDIENTE',
    github: '',
    description: 'PENDIENTE - Completar por el equipo.',
    technologies: [],
    responsibilities: ['PENDIENTE'],
  },
  {
    id: 'integrante-3',
    name: 'PENDIENTE',
    role: 'PENDIENTE',
    github: '',
    description: 'PENDIENTE - Completar por el equipo.',
    technologies: [],
    responsibilities: ['PENDIENTE'],
  },
]

/** Devuelve el integrante buscado o undefined si el id no existe. */
export function getMemberById(id) {
  return teamMembers.find((member) => member.id === id)
}
