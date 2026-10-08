import assert from "node:assert/strict";
import { cityPhotoHandler } from "../api/city-photo.js";
import { obtenerFotoCiudad } from "../src/services/fondo.js";

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
  await cityPhotoHandler({ method, url: `/api/city-photo${query}` }, res, key);
  assert.ok(!JSON.stringify(body).includes("private-test-key"));
  return { status: res.statusCode, headers, body };
};

try {
  let calls = 0;
  global.fetch = async (url, options) => {
    calls++;
    assert.ok(String(url).startsWith("https://api.unsplash.com/photos/random?"));
    assert.equal(options.headers.Authorization, "Bearer private-test-key".replace("Bearer", "Client-ID"));
    assert.ok(String(url).includes("query=La+Plata"));
    return {
      ok: true,
      json: async () => ({
        urls: { regular: "https://images.unsplash.com/photo-test" },
        user: { name: "Test Photographer", links: { html: "https://unsplash.com/@test" } },
      }),
    };
  };

  assert.equal((await invoke("POST", "?ciudad=La Plata")).status, 405);
  assert.equal((await invoke("GET", "")).status, 400);
  assert.equal((await invoke("GET", "?ciudad=La Plata", "")).status, 503);
  assert.equal(calls, 0);

  const success = await invoke("GET", "?ciudad=La Plata");
  assert.equal(success.status, 200);
  assert.equal(success.body.data.url, "https://images.unsplash.com/photo-test");
  assert.equal(success.body.data.autor, "Test Photographer");
  assert.ok(success.headers["Cache-Control"]);

  global.fetch = async () => ({ ok: false, status: 401 });
  assert.equal((await invoke("GET", "?ciudad=La Plata")).status, 502);

  // Fallback: si la ciudad exacta no existe, prueba variantes más generales.
  const seen = [];
  global.fetch = async (url) => {
    seen.push(new URL(String(url)).searchParams.get("query"));
    if (seen.length === 1) return { ok: false, status: 404 };
    return {
      ok: true,
      json: async () => ({
        urls: { regular: "https://images.unsplash.com/photo-fallback" },
        user: { name: "Fallback", links: { html: null } },
      }),
    };
  };
  const fallback = await invoke("GET", "?ciudad=Mar de Ajo, La Costa, Argentina");
  assert.equal(fallback.status, 200);
  assert.equal(fallback.body.data.url, "https://images.unsplash.com/photo-fallback");
  assert.ok(seen.length > 1);
  assert.equal(seen[0], "Mar de Ajo, La Costa, Argentina");

  global.fetch = async () => {
    throw new Error("private-test-key");
  };
  assert.equal((await invoke("GET", "?ciudad=La Plata")).status, 502);

  global.fetch = async () => ({ ok: true, json: async () => ({ invalid: true }) });
  assert.equal((await invoke("GET", "?ciudad=La Plata")).status, 502);

  // Servicio del front: sin credenciales y con respaldo local.
  let requestedUrl = "";
  global.fetch = async (url) => {
    requestedUrl = String(url);
    assert.ok(requestedUrl.startsWith("/api/city-photo?ciudad="));
    return { ok: true, json: async () => ({ data: { url: "https://images.unsplash.com/photo-test", autor: "A", linkAutor: null } }) };
  };
  const photo = await obtenerFotoCiudad("La Plata, Argentina");
  assert.equal(photo.url, "https://images.unsplash.com/photo-test");
  assert.equal(photo.esOffline, false);
  assert.ok(requestedUrl.includes("ciudad=La%20Plata"));

  global.fetch = async () => ({ ok: false, status: 503 });
  const offline = await obtenerFotoCiudad("La Plata, Argentina");
  assert.equal(offline.url, "/foto-respaldo.svg");
  assert.equal(offline.esOffline, true);

  console.log("OK proxy fotos: clave privada, ciudad del integrante y respaldo local");
} finally {
  global.fetch = originalFetch;
}
