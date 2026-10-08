import assert from "node:assert/strict";
import { countriesHandler } from "../api/countries.js";

const originalFetch = global.fetch;
const invoke = async (method, query, key = "private-test-key") => {
  const headers = {};
  let body;
  const res = {
    setHeader: (name, value) => {
      headers[name] = value;
    },
    end: (value) => {
      body = JSON.parse(value);
    },
  };
  await countriesHandler({ method, url: `/api/countries${query}` }, res, key);
  assert.ok(!JSON.stringify(body).includes("private-test-key"));
  return { status: res.statusCode, headers, body };
};
try {
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    assert.equal(url, "https://api.restcountries.com/countries/v5?q=Canada");
    assert.equal(options.headers.Authorization, "Bearer private-test-key");
    return {
      ok: true,
      json: async () => ({
        data: { objects: [{ names: { common: "Canada" }, internal: "omit" }] },
      }),
    };
  };
  assert.equal((await invoke("POST", "?q=Canada")).status, 405);
  assert.equal((await invoke("GET", "?q=https://example.com")).status, 400);
  assert.equal((await invoke("GET", "?q=Canada", "")).status, 503);
  assert.equal(calls, 0);
  const success = await invoke("GET", "?q=Canada");
  assert.equal(success.status, 200);
  assert.equal(success.body.data.objects[0].names.common, "Canada");
  assert.equal(success.body.data.objects[0].internal, undefined);
  assert.ok(success.headers["Cache-Control"]);
  global.fetch = async () => ({ ok: false, status: 401 });
  assert.equal((await invoke("GET", "?q=Canada")).status, 502);
  global.fetch = async () => {
    throw new Error("private-test-key");
  };
  assert.equal((await invoke("GET", "?q=Canada")).status, 502);
  global.fetch = async () => ({
    ok: true,
    json: async () => ({ invalid: true }),
  });
  assert.equal((await invoke("GET", "?q=Canada")).status, 502);
  console.log(
    "OK proxy: autorización privada, validación, respuestas y errores seguros",
  );
} finally {
  global.fetch = originalFetch;
}
