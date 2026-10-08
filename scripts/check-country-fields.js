import assert from "node:assert/strict";
import { getCountry } from "../src/services/restCountries.js";
import { countriesHandler } from "../api/countries.js";

const originalFetch = global.fetch;
const fields = {
  subregion: "North America",
  area: { kilometers: 9984670, miles: 3855101.1 },
  timezones: ["UTC-08:00", "UTC-03:30"],
  languages: [{ name: "English" }, { name: "French" }],
  currencies: [
    { code: "CAD", name: "Canadian dollar", symbol: "$" },
    { code: "USD", name: "US dollar", symbol: "$" },
  ],
};
try {
  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      data: { objects: [{ names: { common: "Canada" }, ...fields }] },
    }),
  });
  let payload;
  await countriesHandler(
    { method: "GET", url: "/api/countries?q=Canada" },
    {
      setHeader() {},
      end(value) {
        payload = JSON.parse(value);
      },
    },
    "test-key",
  );
  for (const field of Object.keys(fields))
    assert.deepEqual(payload.data.objects[0][field], fields[field]);
  global.fetch = async () => ({ ok: true, json: async () => payload });
  const country = await getCountry("Canada");
  assert.equal(country.subregion, "North America");
  assert.equal(country.area, 9984670);
  assert.deepEqual(country.timezones, fields.timezones);
  assert.deepEqual(country.languages, ["English", "French"]);
  assert.deepEqual(country.currencies, [
    "Canadian dollar · CAD ($)",
    "US dollar · USD ($)",
  ]);
  payload.data.objects = [{ names: { common: "Canada" } }];
  const missing = await getCountry("Canada");
  assert.equal(missing.area, null);
  assert.equal(missing.subregion, "No disponible");
  for (const field of ["timezones", "languages", "currencies"])
    assert.deepEqual(missing[field], []);
  payload.data.objects[0].area = { kilometers: 0 };
  assert.equal((await getCountry("Canada")).area, 0);
  console.log(
    "OK: campos v5, múltiples valores, datos faltantes y superficie cero",
  );
} finally {
  global.fetch = originalFetch;
}
