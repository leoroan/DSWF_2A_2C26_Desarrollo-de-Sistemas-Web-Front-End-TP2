// Prueba de los servicios contra las APIs reales (no usa el DOM).
const { getWeather } = await import('../src/services/openMeteo.js')
const { getCountry } = await import('../src/services/restCountries.js')

const fail = (msg) => {
  console.log('FAIL ' + msg)
  process.exitCode = 1
}

try {
  const w = await getWeather()
  const ok =
    typeof w.temperature === 'number' &&
    typeof w.windSpeed === 'number' &&
    typeof w.weatherCode === 'number' &&
    typeof w.description === 'string' &&
    typeof w.time === 'string'
  console.log((ok ? 'OK  ' : 'FAIL') + ' Open-Meteo real -> ' + JSON.stringify(w))
  if (!ok) fail('Open-Meteo devuelve datos incompletos')
} catch (error) {
  fail('Open-Meteo real: ' + error.message)
}

for (const country of ['Argentina', 'Chile', 'Uruguay', 'Brazil', 'Spain']) {
  try {
    const c = await getCountry(country)
    const ok = typeof c.name === 'string' && typeof c.capital === 'string'
    console.log(
      (ok ? 'OK  ' : 'FAIL') +
        ` REST Countries real (${country}) -> ${c.name} | capital=${c.capital} | region=${c.region} | pob=${c.population} | flag=${Boolean(c.flag)} | demo=${c.isDemo}`,
    )
    if (!ok) fail('REST Countries devuelve datos incompletos')
  } catch (error) {
    fail(`REST Countries real (${country}): ` + error.message)
  }
}
