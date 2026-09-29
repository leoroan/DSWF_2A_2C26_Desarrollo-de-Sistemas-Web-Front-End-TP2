# Reemplazo de APIs — TP2 React

Necesito modificar la sección de APIs del proyecto para utilizar exclusivamente estas dos APIs:

- **Open-Meteo**: https://open-meteo.com/
- **REST Countries**: https://restcountries.com/

El objetivo es cumplir el criterio de la rúbrica del TP2 relacionado con el consumo de una API pública, pero manteniendo la implementación **muy básica, clara y educativa**.

No quiero sobreingeniería.

---

## 1. Antes de modificar

Primero inspeccioná el proyecto actual y localizá:

- la página/sección `/api`;
- los componentes relacionados;
- el servicio que actualmente consume la API;
- las rutas;
- cualquier código de la API anterior.

No modifiques otras funcionalidades del TP.

No cambies:

- la navegación general;
- la sidebar;
- los datos locales JSON;
- los perfiles;
- la bitácora;
- el árbol de componentes;
- la identidad visual.

Solamente reemplazá/adaptá la implementación correspondiente a las APIs.

---

# 2. Open-Meteo

Utilizar Open-Meteo para mostrar información meteorológica.

La API de forecast utiliza coordenadas `latitude` y `longitude` y permite solicitar variables meteorológicas concretas.

Para mantener el ejemplo simple, utilizar una ubicación fija inicialmente.

Por ejemplo:

```text
Buenos Aires
latitude: -34.6037
longitude: -58.3816
```

Solicitar solamente algunos datos básicos, por ejemplo:

- temperatura actual;
- velocidad del viento;
- código meteorológico.

Utilizar la API de forecast:

```text
https://api.open-meteo.com/v1/forecast
```

con parámetros equivalentes a:

```text
latitude=-34.6037
longitude=-58.3816
current=temperature_2m,wind_speed_10m,weather_code
```

No es necesario implementar mapas, gráficos, pronósticos complejos ni geolocalización del usuario.

### Opcional

Si ya existe una estructura sencilla para hacerlo, se puede agregar un campo de búsqueda de ciudad utilizando la API de geocodificación de Open-Meteo:

```text
https://geocoding-api.open-meteo.com/v1/search
```

Esta API permite buscar una ciudad y obtener sus coordenadas.

Pero **esto es opcional**.

Si agrega demasiada complejidad, mantener simplemente Buenos Aires como ubicación fija.

---

# 3. REST Countries

Utilizar REST Countries para mostrar información básica de países.

La API actual utiliza `/v5` y proporciona datos como nombre, código ISO, capital, región, población, idiomas y banderas.

La implementación debe ser sencilla.

Por ejemplo, utilizar un endpoint de consulta de países y mostrar:

- nombre;
- capital;
- región;
- población;
- bandera.

No es necesario mostrar todos los campos disponibles.

---

## 4. Autenticación REST Countries

IMPORTANTE:

La versión actual de REST Countries requiere API key para sus endpoints v5.

No hardcodear una clave privada dentro del código.

Si el proyecto ya dispone de una clave proporcionada por el equipo, utilizar la configuración de variables de entorno apropiada para Vite/React y documentar que las variables frontend **no son secretos reales**.

No subir una clave privada al repositorio.

Para desarrollo inicial puede utilizarse la demo key indicada por la documentación oficial únicamente si resulta necesaria para probar la integración:

```text
rc_live_demo
```

La documentación oficial indica que esta demo permite probar la API sin cuenta ni consumo de cuota.

Sin embargo, no diseñar toda la aplicación alrededor de una dependencia innecesaria de esa demo.

---

# 5. Arquitectura

Mantener una separación sencilla:

```text
pages/
    Api/

services/
    openMeteo.js
    restCountries.js

components/
    api/
        WeatherCard
        CountryCard
```

Si la estructura existente es diferente pero equivalente, mantenerla.

No crear capas adicionales innecesarias.

La página debería encargarse de:

- estado;
- loading;
- error;
- renderizado.

Los servicios deberían encargarse de:

- construir la URL;
- ejecutar `fetch`;
- validar `response.ok`;
- devolver JSON.

Ejemplo conceptual:

```js
export async function getWeather() {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}
```

---

# 6. Página `/api`

La sección de APIs debe mostrar claramente **dos bloques independientes**:

```text
APIs públicas

┌─────────────────────────────┐
│ Open-Meteo                  │
│                             │
│ Temperatura: ...            │
│ Viento: ...                 │
│ Estado: ...                 │
│                             │
│ [Actualizar]                │
└─────────────────────────────┘


┌─────────────────────────────┐
│ REST Countries              │
│                             │
│ País: ...                   │
│ Capital: ...                │
│ Región: ...                 │
│ Población: ...              │
│ Bandera                     │
│                             │
│ [Actualizar]                │
└─────────────────────────────┘
```

No hace falta crear un dashboard.

La presentación visual puede ser completamente básica.

---

# 7. Estados obligatorios

Cada API debe manejar independientemente:

```text
loading
success
error
```

Ejemplo:

```text
Cargando clima...
```

y:

```text
No se pudo obtener la información meteorológica.
[Reintentar]
```

Lo mismo para REST Countries.

No permitir que el error de una API haga desaparecer la otra.

Por ejemplo:

```text
Open-Meteo
✓ Datos cargados

REST Countries
✗ Error
[Reintentar]
```

debe ser perfectamente válido.

---

# 8. Botón de actualización/reintento

Cada API debe tener su propio botón:

```text
Actualizar
```

o:

```text
Reintentar
```

El botón debe volver a ejecutar la consulta.

No duplicar la lógica del `fetch`.

---

# 9. Datos mostrados

No mostrar respuestas JSON completas.

Transformar la respuesta a los datos que realmente necesita la interfaz.

Por ejemplo:

```js
{
  temperature: ...,
  windSpeed: ...,
  weatherCode: ...
}
```

para Open-Meteo.

Y:

```js
{
  name: ...,
  capital: ...,
  region: ...,
  population: ...,
  flag: ...
}
```

para REST Countries.

La interfaz debe mostrar solamente esos datos.

---

# 10. Selección de país

Para mantenerlo simple, REST Countries puede comenzar mostrando un país definido por defecto.

Por ejemplo:

```text
Argentina
```

o utilizar un selector sencillo si resulta fácil de implementar.

Si se utiliza selector:

```text
Argentina
Brasil
Chile
Uruguay
...
```

al cambiar el país debe realizarse una nueva consulta.

No implementar búsqueda avanzada ni filtros complejos.

---

# 11. No sobreingeniería

NO agregar:

- Axios;
- React Query;
- Redux;
- Zustand;
- Context API solamente para estas APIs;
- mapas;
- gráficos;
- geolocalización;
- autenticación;
- backend;
- caché;
- base de datos.

Utilizar `fetch`, `useState` y `useEffect` cuando sean suficientes.

---

# 12. Manejo de errores

Validar:

```js
if (!response.ok) {
  throw new Error(...)
}
```

Capturar los errores en React.

No mostrar errores técnicos innecesarios al usuario.

El detalle técnico puede quedar en consola durante desarrollo, pero la interfaz debe mostrar un mensaje claro.

---

# 13. Loading

Evitar que la interfaz aparezca vacía durante la consulta.

Mostrar algo sencillo:

```text
Cargando...
```

No utilizar skeletons ni animaciones complejas.

---

# 14. Documentación mínima

Agregar en el README una pequeña sección:

```md
## APIs utilizadas

### Open-Meteo

Se utiliza para consultar información meteorológica mediante coordenadas geográficas.

Sitio:
https://open-meteo.com/

### REST Countries

Se utiliza para consultar información básica de países.

Sitio:
https://restcountries.com/
```

Si REST Countries requiere una clave para la configuración final, documentar también qué variable de entorno debe configurarse, sin publicar el valor de la clave.

---

# 15. Verificación

Al terminar:

1. ejecutar la aplicación;
2. entrar a `/api`;
3. verificar que Open-Meteo responde;
4. verificar que REST Countries responde;
5. comprobar el estado de loading;
6. comprobar el estado de error si es posible;
7. comprobar el botón de reintento;
8. comprobar que un error de una API no rompe la otra;
9. ejecutar el build.

Ejecutar:

```bash
npm run build
```

y corregir cualquier error.

---

# 16. Restricción importante

No modificar el resto del TP.

El alcance de este trabajo es únicamente:

```text
API anterior
      ↓
eliminar/reemplazar
      ↓
Open-Meteo
      +
REST Countries
```

La implementación debe ser:

- simple;
- pequeña;
- fácil de explicar oralmente;
- fácil de leer;
- suficientemente completa para demostrar consumo de APIs;
- compatible con la rúbrica del TP2.

Al finalizar, indicá brevemente:

- archivos modificados;
- archivos creados;
- APIs implementadas;
- funcionalidades disponibles;
- si REST Countries requiere configuración adicional;
- resultado del `npm run build`.

sugerencia externa: Ojo con REST Countries: cuando el agente lo implemente, que no copie ejemplos viejos de Internet usando restcountries.com/v3.1/.... La documentación actual marca v5 como la versión mantenida, y el cambio a autenticación es real.

Para un TP, yo mantendría Open-Meteo + REST Countries extremadamente simples: una tarjeta de clima y una tarjeta de país, cada una con loading/error/retry. Eso demuestra perfectamente fetch, servicios, estado React y consumo de APIs sin convertir la sección en un proyecto aparte.
