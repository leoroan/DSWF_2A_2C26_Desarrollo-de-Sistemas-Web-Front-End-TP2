# TP2 — Instrucciones para el agente de desarrollo

## 1. Objetivo

Este proyecto corresponde al **Trabajo Práctico Grupal 2 — Proyecto React en equipo** de Desarrollo de Sistemas Web Front End.

Tu tarea es dejar implementada una **base funcional, estructural y técnicamente correcta** que cumpla los requisitos de la consigna y, cuando sea posible sin introducir complejidad innecesaria, alcance el nivel **“Propone”** de la rúbrica.

### Importante

**No te encargues del diseño visual final del proyecto.**

El proyecto será trabajado posteriormente por otra persona encargada de la identidad visual y por el responsable de estructura.

Por lo tanto:

- priorizá arquitectura, componentes, navegación y funcionalidad;
- utilizá estilos mínimos y funcionales;
- no desarrolles una identidad visual compleja;
- no dediques tiempo a animaciones, ilustraciones, efectos, paletas sofisticadas ni composición visual avanzada;
- evitá incorporar librerías de UI innecesarias;
- dejá componentes y estructuras preparados para que otra persona pueda aplicar el diseño posteriormente.

La aplicación debe ser perfectamente funcional aun con una estética básica.

---

# 2. Fuente de verdad

La implementación debe seguir la consigna oficial del TP2 y su rúbrica.

Los 15 criterios son:

1. Repositorio y publicación
2. README obligatorio
3. Integrantes con acceso al repositorio
4. Proyecto desarrollado en React
5. Sidebar compartida
6. Navegación completa
7. Portada del equipo
8. Perfiles dentro de React
9. Apropiación y propuesta estética
10. Datos locales JSON
11. Búsqueda y filtro
12. API pública y estados
13. Árbol de renderizado
14. Bitácora
15. Declaración de uso de IA

El objetivo de este trabajo es dejar implementados especialmente los criterios **4 al 15** que dependen del código.

Los criterios relativos a repositorio, colaboradores y publicación deberán quedar documentados/preparados, pero no inventes información que no esté disponible.

---

# 3. Primera regla: inspeccionar antes de modificar

Antes de escribir código:

1. inspeccioná la estructura actual del proyecto;
2. identificá el framework y versión de React utilizados;
3. revisá `package.json`;
4. revisá los archivos existentes;
5. identificá si React Router ya está instalado;
6. identificá si existe una estructura de componentes;
7. identificá si existe información del TP1 reutilizable;
8. identificá qué información del equipo ya existe;
9. identificá cualquier decisión arquitectónica existente.

### No hagas esto

No borres ni reemplaces arbitrariamente el proyecto existente.

No inicialices nuevamente el proyecto si ya existe una aplicación React funcional.

No cambies de framework.

No migres innecesariamente entre JavaScript y TypeScript.

No agregues dependencias si la funcionalidad puede resolverse razonablemente con las herramientas existentes.

---

# 4. Principio arquitectónico

La aplicación debe estar construida como una aplicación React real, no como una única pantalla gigante.

Debe existir una separación clara entre:

- layout;
- navegación;
- páginas;
- componentes reutilizables;
- datos;
- servicios de API;
- contenido/configuración.

Una estructura posible es:

```text
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── AppLayout
│   │   └── Sidebar
│   ├── team/
│   │   ├── TeamIntro
│   │   ├── MemberCard
│   │   └── MemberList
│   ├── data/
│   │   ├── DataCard
│   │   ├── DataList
│   │   ├── SearchInput
│   │   └── FilterSelect
│   ├── api/
│   │   └── ApiResultCard
│   ├── tree/
│   │   └── ComponentTree
│   └── common/
├── data/
│   ├── team.js / team.json
│   ├── records.json
│   ├── changelog.json
│   └── ai-usage.js / ai-usage.json
├── pages/
│   ├── Home/
│   ├── Members/
│   ├── MemberProfile/
│   ├── Records/
│   ├── Api/
│   ├── ComponentTree/
│   ├── Changelog/
│   └── AiUsage/
├── services/
│   └── publicApi.js
├── router/
│   └── router.jsx
├── App.jsx
└── main.jsx
```

Esta estructura es orientativa.

Si el proyecto existente tiene una estructura equivalente, mantenela.

No reorganices archivos únicamente por preferencia personal.

---

# 5. React Router

La aplicación debe utilizar **React Router** para la navegación.

Debe existir un layout común que contenga la sidebar.

Conceptualmente:

```text
App
└── Router
    └── AppLayout
        ├── Sidebar
        └── Outlet
            ├── Home
            ├── Members
            ├── MemberProfile
            ├── Records
            ├── PublicApi
            ├── ComponentTree
            ├── Changelog
            └── AiUsage
```

La sidebar debe permanecer como estructura común mientras cambia el contenido de la página.

Utilizar `Outlet` cuando corresponda.

No duplicar la sidebar dentro de cada página.

---

# 6. Rutas mínimas

Implementá rutas equivalentes a:

```text
/
├── /integrantes
├── /integrantes/:id
├── /datos
├── /api
├── /arbol
├── /bitacora
└── /ia
```

Los nombres pueden adaptarse a la propuesta del proyecto, pero deben existir las funcionalidades correspondientes.

Cada ruta debe poder abrirse directamente.

Ejemplo:

```text
https://sitio.vercel.app/datos
https://sitio.vercel.app/api
https://sitio.vercel.app/integrantes/juan
```

No debe ser necesario entrar siempre por `/` para que una página funcione.

---

# 7. Sidebar compartida

Implementar una sidebar reutilizable.

Debe contener como mínimo:

- identidad/nombre del equipo;
- enlaces a las secciones;
- indicación visual básica de la sección activa.

Utilizar el mecanismo apropiado de React Router para detectar la ruta activa.

Preferentemente:

```jsx
<NavLink ... />
```

en lugar de implementar manualmente la detección de URL.

### Responsive

Aunque el diseño final no es responsabilidad de este trabajo, dejar una estructura razonable para que la sidebar pueda convertirse posteriormente en un panel móvil.

No hace falta desarrollar un diseño sofisticado.

Si resulta sencillo, implementar:

- sidebar visible en desktop;
- botón de apertura/cierre en viewport pequeño.

Esto permite apuntar al nivel **Propone** del criterio 5.

---

# 8. Navegación completa

Ninguna página debe dejar al usuario atrapado.

Cada sección debe poder:

- volver a una sección mediante navegación interna;
- acceder a otras secciones mediante la sidebar;
- acceder a perfiles mediante enlaces internos;
- volver desde un perfil al listado;
- volver desde cualquier sección a la portada.

No depender del botón "Atrás" del navegador.

Agregar botones/enlaces de retorno donde tengan sentido.

---

# 9. Portada del equipo

La portada `/` debe presentar al equipo.

Debe contener:

- nombre del equipo;
- descripción;
- presentación breve;
- listado o acceso a integrantes;
- enlaces internos hacia cada perfil.

No convertir la portada simplemente en un listado de tarjetas.

Debe existir una sección introductoria independiente.

### Importante

No inventar nombres, biografías, GitHub ni información personal.

Si todavía no existen datos reales, centralizarlos en una fuente claramente identificable y utilizar placeholders explícitos.

Ejemplo:

```js
export const teamMembers = [
  {
    id: "integrante-1",
    name: "PENDIENTE",
    role: "PENDIENTE",
    github: "",
    description: "Completar por el equipo.",
  },
];
```

No fabricar información.

---

# 10. Perfiles individuales

Debe existir una ruta individual para cada integrante:

```text
/integrantes/:id
```

Los perfiles deben ser páginas React reales.

No enlazar simplemente al TP1.

El perfil debe obtener los datos desde una fuente centralizada.

Por ejemplo:

```jsx
<MemberProfile member={member} />
```

Debe existir reutilización de componentes mediante props.

Esto ayuda a cumplir el criterio 4 en nivel **Propone**.

### Interacción

Para intentar alcanzar el nivel Propone del criterio 8, cada perfil debería incorporar alguna interacción funcional sencilla.

Ejemplos válidos:

- desplegar información adicional;
- mostrar/ocultar tecnologías;
- expandir una sección;
- mostrar detalles del perfil.

No agregar interacción artificial únicamente por cumplir.

---

# 11. Datos locales JSON

Debe existir un archivo JSON local con **mínimo 20 registros reales y relacionados con la propuesta del proyecto**.

No utilizar un array generado artificialmente en un componente.

Ejemplo:

```text
src/data/records.json
```

Debe ser importado y renderizado dinámicamente.

La aplicación debe demostrar claramente que los datos vienen del JSON.

Ejemplo conceptual:

```jsx
records.map((record) => <DataCard key={record.id} data={record} />);
```

### Requisito mínimo

Debe haber:

```text
>= 20 registros
```

Cada registro debe tener una estructura consistente.

Ejemplo:

```json
{
  "id": 1,
  "name": "...",
  "category": "...",
  "description": "...",
  "details": "..."
}
```

La estructura exacta dependerá de la temática real del proyecto.

---

# 12. Detalle expandible de los registros

Intentar alcanzar el nivel **Propone** del criterio 10.

Cada registro debería permitir consultar información adicional.

Puede utilizarse:

- `<details>`;
- estado React;
- acordeón sencillo.

Ejemplo:

```jsx
<details>
  <summary>{record.name}</summary>
  <p>{record.description}</p>
  <p>{record.details}</p>
</details>
```

No hace falta desarrollar un componente visual complejo.

---

# 13. Búsqueda

La página de datos debe incorporar una búsqueda textual.

La búsqueda debe modificar realmente los resultados.

Debe existir estado React para el texto:

```jsx
const [search, setSearch] = useState("");
```

Y aplicar el criterio sobre los registros.

La búsqueda debería considerar al menos una o más propiedades relevantes, por ejemplo:

- nombre;
- descripción;
- categoría.

Evitar búsquedas sensibles a mayúsculas/minúsculas.

---

# 14. Filtro

Además de la búsqueda, debe existir un filtro por una propiedad de los datos.

Ejemplo:

```text
Categoría
```

El filtro debe generarse preferentemente a partir de los valores existentes en el JSON, evitando duplicar manualmente valores cuando no sea necesario.

Ejemplo conceptual:

```js
const categories = [...new Set(records.map((record) => record.category))];
```

La búsqueda y el filtro deben poder utilizarse simultáneamente.

---

# 15. Sin resultados y reset

Para alcanzar el nivel **Propone** del criterio 11:

Cuando la combinación de búsqueda/filtro no produzca resultados:

```text
No se encontraron resultados.
```

Debe existir una acción para restablecer la lista:

```text
Limpiar filtros
```

El botón debe:

- limpiar búsqueda;
- restablecer filtro;
- mostrar nuevamente todos los registros.

---

# 16. API pública

La aplicación debe consumir una **API pública real**, accesible desde el navegador y sin necesidad de exponer claves privadas.

No utilizar una API inventada.

No implementar la API mediante datos locales simulando una llamada HTTP.

Debe existir una separación razonable entre:

```text
Página React
      ↓
servicio API
      ↓
fetch()
      ↓
API pública
```

Por ejemplo:

```text
src/services/publicApi.js
```

La página debe consumir ese servicio.

---

# 17. Elección de API

Elegir una API pública que:

- sea realmente accesible desde navegador;
- no requiera secretos;
- tenga una respuesta suficientemente estable;
- permita demostrar correctamente loading/error;
- tenga relación razonable con la propuesta del proyecto.

Si la temática del proyecto todavía no permite elegir una API relacionada, utilizar una API pública estable y documentar claramente qué información aporta.

No utilizar una API que requiera:

```text
API_KEY
SECRET
TOKEN_PRIVADO
```

en el frontend.

Nunca colocar secretos en:

```text
.env
```

si terminarán expuestos al navegador.

---

# 18. Estados de la API

La página `/api` debe manejar explícitamente como mínimo:

```text
idle
loading
success
error
```

Durante la consulta:

```text
Cargando...
```

Ante un error:

```text
No se pudieron cargar los datos.
```

No dejar errores silenciosos.

No hacer solamente:

```js
fetch(url).then(...)
```

sin manejar estados.

---

# 19. Reintentar / actualizar

Intentar alcanzar el nivel **Propone** del criterio 12.

La interfaz debe permitir volver a consultar la API.

Por ejemplo:

```text
Reintentar
```

o:

```text
Actualizar
```

La acción debe volver a ejecutar la consulta.

Evitar duplicar lógica:

```js
const loadData = async () => {
   ...
};
```

y reutilizar esa función para la carga inicial y el botón de reintento.

---

# 20. Manejo correcto del fetch

El servicio debe:

- realizar la petición;
- verificar errores HTTP;
- convertir la respuesta;
- propagar errores al componente.

No asumir que cualquier respuesta HTTP es exitosa.

Ejemplo conceptual:

```js
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

return response.json();
```

La lógica visual de loading/error debe permanecer en React, no mezclarse innecesariamente con el servicio.

---

# 21. Árbol de componentes

Debe existir una sección `/arbol`.

La información debe representar la **jerarquía real de componentes utilizados por la aplicación**.

No presentar simplemente la estructura de carpetas.

Por ejemplo:

```text
App
└── Router
    └── AppLayout
        ├── Sidebar
        └── Outlet
            ├── Home
            │   ├── TeamIntro
            │   └── MemberList
            │       └── MemberCard
            │
            ├── Members
            │   └── MemberList
            │       └── MemberCard
            │
            ├── MemberProfile
            │
            ├── Records
            │   ├── SearchInput
            │   ├── FilterSelect
            │   └── DataList
            │       └── DataCard
            │
            ├── PublicApi
            │   └── ApiResultCard
            │
            ├── ComponentTree
            │
            ├── Changelog
            │
            └── AiUsage
```

El árbol debe actualizarse si cambia la arquitectura.

---

# 22. Árbol interactivo

Intentar alcanzar el nivel **Propone**.

El usuario debería poder:

- expandir nodos;
- contraer nodos;
- visualizar jerarquías.

No es necesario instalar una librería especializada.

Puede implementarse con:

```html
<details></details>
```

si resulta suficiente.

La información mostrada debe corresponder con el código real.

No presentar componentes inexistentes únicamente para que el árbol parezca más completo.

---

# 23. Bitácora

Debe existir una sección `/bitacora`.

Debe contener registros reales del proceso de desarrollo.

Ejemplo de estructura:

```json
[
  {
    "id": 1,
    "date": "YYYY-MM-DD",
    "title": "Definición de estructura",
    "description": "..."
  }
]
```

No inventar experiencias personales del equipo.

Si el trabajo todavía está en desarrollo, utilizar entradas marcadas como pendientes o proporcionar una estructura preparada para que el equipo complete.

La sección debe estar preparada para que posteriormente se incorporen las decisiones reales.

---

# 24. Bitácora interactiva

Intentar alcanzar el nivel **Propone** del criterio 14.

Puede utilizarse:

```html
<details></details>
```

para cada entrada.

No hace falta desarrollar filtros complejos.

La prioridad es que la información sea legible y fácilmente actualizable.

---

# 25. Declaración de uso de IA

Debe existir una sección `/ia`.

Además, el README debe incluir la declaración correspondiente.

La consigna exige distinguir:

```text
Aplicación utilizada
Modelo utilizado
```

No confundir ambos conceptos.

Ejemplo conceptual:

```json
{
  "member": "PENDIENTE",
  "application": "PENDIENTE",
  "model": "PENDIENTE",
  "tasks": ["PENDIENTE"]
}
```

No inventar qué IA utilizó cada integrante.

Dejar la estructura preparada para completar.

---

# 26. Nivel Propone para IA

La estructura debe permitir documentar por integrante:

- integrante;
- aplicación de IA;
- modelo;
- tarea o contenido en el que se utilizó.

Ejemplo:

```text
Integrante
→ Aplicación
→ Modelo
→ Uso
```

Esto debe poder representarse dentro de la aplicación y en el README.

---

# 27. README

El README debe quedar preparado y ser funcional.

Debe contener como mínimo:

```text
Descripción del proyecto
Deploy
Integrantes
GitHub de cada integrante
Uso de IA
```

Además, dejar preparada una estructura para:

- índice;
- capturas;
- responsabilidades de cada integrante.

No inventar:

- URLs;
- usuarios de GitHub;
- nombres;
- URL de Vercel;
- herramientas de IA;
- modelos.

Usar placeholders claramente identificados cuando esos datos todavía no estén disponibles.

---

# 28. README sugerido

La estructura debería ser aproximadamente:

```md
# Nombre del proyecto

## Descripción

...

## Demo

[Ver aplicación](URL_PENDIENTE)

## Índice

- [Descripción](#descripción)
- [Integrantes](#integrantes)
- [Funcionalidades](#funcionalidades)
- [Uso de IA](#uso-de-ia)

## Integrantes

### Nombre Apellido

- GitHub: URL
- Responsabilidad: ...

## Funcionalidades

- Navegación React
- Perfiles
- Datos locales
- Búsqueda
- Filtros
- API pública
- Árbol de componentes
- Bitácora

## Uso de IA

| Integrante | Aplicación | Modelo | Uso |
| ---------- | ---------- | ------ | --- |
| ...        | ...        | ...    | ... |

## Deploy

URL

## Capturas

Pendiente de agregar.
```

No completar datos desconocidos con información ficticia.

---

# 29. Criterio 9 — diseño

Este criterio queda **fuera del alcance principal de este trabajo**.

No desarrollar:

- identidad visual;
- branding;
- paleta definitiva;
- tipografía definitiva;
- ilustraciones;
- imágenes generadas;
- composición estética avanzada.

Sí debe existir una presentación mínima funcional:

- texto legible;
- contraste suficiente;
- separación básica;
- layout funcional;
- componentes identificables;
- responsive básico cuando corresponda.

El objetivo es que otro integrante pueda reemplazar fácilmente estos estilos sin tener que reconstruir la aplicación.

---

# 30. Componentización

Priorizar componentes reutilizables.

Ejemplo:

```jsx
<MemberCard member={member} />
```

en lugar de crear manualmente una tarjeta diferente para cada integrante.

Lo mismo para:

```jsx
<DataCard data={record} />
```

y componentes equivalentes.

Los componentes deben recibir datos mediante props cuando corresponda.

No crear componentes innecesariamente pequeños sólo para inflar el árbol.

---

# 31. Datos fuera de los componentes

Evitar:

```jsx
function Records() {
  const records = [
    ...
  ];
}
```

si esos datos representan contenido de la aplicación.

Preferir:

```text
src/data/
```

para datos locales.

Los componentes deben ocuparse de renderizar y manejar interacción, no almacenar grandes cantidades de contenido.

---

# 32. Separación de responsabilidades

Mantener una separación razonable:

```text
data/
    contenido estático

services/
    comunicación externa

components/
    piezas reutilizables

pages/
    composición de pantallas

router/
    navegación

App/
    composición principal
```

No implementar una arquitectura empresarial innecesaria.

Este es un proyecto educativo.

La arquitectura debe ser clara y fácil de explicar frente al docente.

---

# 33. Estado React

Usar estado React solamente donde corresponda.

Casos esperables:

```text
Sidebar abierta/cerrada
Búsqueda
Filtro
Detalle expandido
Estado API
```

No introducir Redux, Zustand u otros gestores globales salvo que el proyecto existente ya los utilice y exista una razón concreta.

Para este TP no son necesarios.

---

# 34. Accesibilidad básica

Sin entrar en diseño, respetar buenas prácticas básicas:

- botones reales para acciones;
- enlaces reales para navegación;
- `label` cuando corresponda;
- `alt` en imágenes;
- elementos semánticos;
- no usar `<div onClick>` para acciones que deberían ser botones.

---

# 35. Manejo de errores

La aplicación no debe romperse ante:

- ID inexistente;
- API caída;
- respuesta HTTP inválida;
- JSON vacío;
- búsqueda sin resultados.

Crear una página o estado razonable para un perfil inexistente.

Ejemplo:

```text
Integrante no encontrado.
Volver a integrantes
```

---

# 36. No sobreingeniería

Este punto es importante.

No agregar:

- Redux;
- Zustand;
- React Query;
- Axios;
- frameworks de UI;
- sistemas de diseño completos;
- backend;
- base de datos;
- autenticación;
- Docker;
- arquitectura de microservicios;

salvo que ya formen parte del proyecto y sean necesarios.

El TP requiere una aplicación React con datos locales y una API pública.

La solución debe ser proporcional al problema.

---

# 37. Calidad del código

El código debe:

- ser legible;
- evitar duplicación;
- utilizar nombres descriptivos;
- evitar componentes gigantes;
- evitar lógica duplicada;
- evitar valores mágicos cuando puedan centralizarse;
- evitar `console.log` innecesarios;
- no contener código muerto;
- no contener imports sin utilizar;
- no dejar errores de lint/build.

---

# 38. Verificaciones obligatorias

Antes de finalizar, ejecutar:

```bash
npm install
npm run build
```

y cualquier comando de lint disponible en el proyecto.

Si existe:

```bash
npm run lint
```

debe ejecutarse.

Corregir errores reales de compilación/lint.

---

# 39. Checklist funcional

Antes de terminar, verificar uno por uno:

## Criterio 4

- [ ] La aplicación utiliza React.
- [ ] Las pantallas están construidas mediante componentes.
- [ ] Existe reutilización mediante props.

## Criterio 5

- [ ] Existe sidebar compartida.
- [ ] Tiene identidad del equipo.
- [ ] Tiene enlaces funcionales.
- [ ] Identifica la sección activa.
- [ ] La estructura permite adaptación móvil.

## Criterio 6

- [ ] Todas las rutas tienen salida.
- [ ] No se necesita usar "Atrás".
- [ ] Existen enlaces internos apropiados.
- [ ] Las rutas pueden abrirse directamente.

## Criterio 7

- [ ] La portada presenta al equipo.
- [ ] Tiene nombre.
- [ ] Tiene descripción.
- [ ] Tiene acceso a integrantes.
- [ ] No es simplemente un listado de perfiles.

## Criterio 8

- [ ] Existe un perfil React por integrante.
- [ ] Los perfiles no dependen del TP1.
- [ ] Cada perfil funciona mediante ruta propia.
- [ ] Existe alguna interacción funcional.

## Criterio 10

- [ ] Existe JSON local.
- [ ] Tiene mínimo 20 registros.
- [ ] Los registros están relacionados con el proyecto.
- [ ] Se renderizan dinámicamente.
- [ ] Cada registro permite consultar información adicional.

## Criterio 11

- [ ] Existe búsqueda textual.
- [ ] Existe filtro.
- [ ] Ambos modifican los resultados.
- [ ] Pueden combinarse.
- [ ] Se informa cuando no hay resultados.
- [ ] Existe reset.

## Criterio 12

- [ ] Existe API pública.
- [ ] Se consulta mediante `fetch` o equivalente.
- [ ] Se muestran resultados.
- [ ] Existe estado loading.
- [ ] Existe estado error.
- [ ] Existe reintento/actualización.
- [ ] No hay secretos expuestos.

## Criterio 13

- [ ] Existe sección del árbol.
- [ ] El árbol corresponde al código.
- [ ] Muestra componentes reales.
- [ ] Puede expandirse/contraerse.

## Criterio 14

- [ ] Existe bitácora.
- [ ] Tiene registros.
- [ ] No está vacía.
- [ ] Los registros pueden consultarse cómodamente.

## Criterio 15

- [ ] Existe sección de IA.
- [ ] Está contemplada en README.
- [ ] Distingue aplicación de modelo.
- [ ] Permite identificar el uso por integrante.
- [ ] No se inventaron datos.

---

# 40. Criterios que dependen de acciones externas

No intentes resolver mediante código lo que corresponde al equipo o al repositorio.

Estos puntos deben quedar identificados:

### Criterio 1

El equipo debe:

- crear repositorio público;
- publicar en Vercel;
- verificar ambos accesos sin autenticación.

### Criterio 3

El propietario debe:

- invitar a todos los integrantes;
- verificar que aceptaron la invitación.

El agente puede documentar estos pasos, pero no debe asumir que fueron realizados.

---

# 41. Qué NO modificar

No modificar innecesariamente:

- configuración de Vercel;
- configuración del repositorio;
- credenciales;
- variables privadas;
- información personal;
- identidad visual;
- contenido que todavía no fue definido por el equipo.

No inventar datos para hacer parecer terminado el proyecto.

Cuando falte información real, usar:

```text
PENDIENTE
```

y dejar el punto preparado para completar.

---

# 42. Resultado esperado

Al terminar, el proyecto debe poder ejecutarse localmente y presentar una aplicación funcional con esta estructura conceptual:

```text
┌──────────────────────────────────────┐
│                App                   │
├──────────────┬───────────────────────┤
│              │                       │
│   Sidebar    │      Página actual    │
│              │                       │
│   Inicio     │                       │
│   Integrantes│                       │
│   Datos      │                       │
│   API        │                       │
│   Árbol      │                       │
│   Bitácora   │                       │
│   IA         │                       │
│              │                       │
└──────────────┴───────────────────────┘
```

Y las funcionalidades:

```text
Inicio
  └── Presentación del equipo
       └── Integrantes
            └── Perfil individual

Datos
  ├── JSON >= 20 registros
  ├── búsqueda
  ├── filtro
  ├── sin resultados
  ├── reset
  └── detalle expandible

API
  ├── loading
  ├── success
  ├── error
  └── retry

Árbol
  └── jerarquía real de componentes
      └── expandir/contraer

Bitácora
  └── registros del proceso

IA
  └── aplicación + modelo + integrante + uso
```

---

# 43. Criterio final de implementación

Antes de declarar terminado el trabajo, compará el proyecto implementado contra los **15 criterios de la rúbrica oficial**, no solamente contra esta instrucción.

Si existe una diferencia entre una decisión de implementación y la rúbrica, priorizá la rúbrica.

La prioridad es:

```text
1. Que funcione.
2. Que cumpla la consigna.
3. Que la arquitectura sea clara.
4. Que sea fácil de mantener/modificar.
5. Que permita alcanzar "Propone" donde sea razonable.
6. El diseño visual queda para otra etapa.
```

No declares que un criterio está cumplido si la implementación no puede demostrarse funcionando.

Al finalizar, entregá un resumen indicando:

```text
- Archivos creados/modificados.
- Funcionalidades implementadas.
- Criterios de la rúbrica cubiertos.
- Criterios que requieren información del equipo.
- Dependencias agregadas, si las hubiera.
- Comandos utilizados para verificar el proyecto.
- Cualquier pendiente real.
```
