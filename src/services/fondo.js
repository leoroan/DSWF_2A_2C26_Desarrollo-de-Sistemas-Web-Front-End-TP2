// api/unsplash.js

const ACCESS_KEY = "UGvBBf-Nxe5VvS5ZUtyDcpsmvwn4V9XMhBLpS-VxrHQ"; 
const CIUDAD = "Buenos Aires";

export async function obtenerFotoCiudad() {
    const baseURL = "https://api.unsplash.com/photos/random";
    
    const parametros = new URLSearchParams({
        query: CIUDAD,          
        orientation: "landscape",
        count: "1",             
        client_id: ACCESS_KEY
    });

    const urlCompleta = `${baseURL}?${parametros.toString()}`;

    try {
        const respuesta = await fetch(urlCompleta);
        
        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        if (datos && datos.length > 0) {
            const foto = datos[0];
            return {
                url: foto.urls.regular,
                autor: foto.user.name,
                linkAutor: `${foto.user.links.html}?utm_source=proyecto_grupal&utm_medium=referral`,
                esOffline: false
            };
        }
    } catch (error) {
        console.warn("La API falló o bloqueó la solicitud. Usando imagen de respaldo local...", error);
    }

    // Retorno de respaldo si falla el bloque try o el arreglo viene vacío
    return obtenerImagenRespaldo();
}

function obtenerImagenRespaldo() {
    return {
        // NOTA: Asegúrate de poner una URL de imagen real aquí, ya que 'unsplash.com' a secas no es un archivo de imagen.
        url: "https://unsplash.com", 
        autor: "Buenos Aires (Vista offline)",
        linkAutor: null,
        esOffline: true
    };
}
