 
    const ACCESS_KEY = "UGvBBf-Nxe5VvS5ZUtyDcpsmvwn4V9XMhBLpS-VxrHQ"; 
    const CIUDAD = "Buenos Aires";

   async function obtenerFotoCiudad() {
   
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
        
        // El endpoint random con count=1 devuelve un arreglo directo de fotos
        if (datos && datos.length > 0) {
            const foto = datos[0]; //el primer objeto del arreglo aleatorio
            
            document.getElementById('capa-fondo').style.backgroundImage = `url('${foto.urls.regular}')`;
            
            const divCreditos = document.getElementById('capa-creditos');
            divCreditos.innerHTML = `
                <a class="creditos" href="${foto.user.links.html}?utm_source=proyecto_grupal&utm_medium=referral" target="_blank">
                    Foto por ${foto.user.name} en Unsplash
                </a>
            `;
        } else {
            usarImagenRespaldo();
        }
    } catch (error) {
        console.warn("La API falló o bloqueó la solicitud. Usando imagen de respaldo local...", error);
        usarImagenRespaldo();
    }
}



    // si la API excede su cuota o falla la red
    function usarImagenRespaldo() {
        const fotoRespaldo = "https://unsplash.com";
        document.getElementById('capa-fondo').style.backgroundImage = `url('${fotoRespaldo}')`;
        
        const divCreditos = document.getElementById('capa-creditos');
        divCreditos.innerHTML = `
            <span class="creditos">Buenos Aires (Vista offline)</span>
        `;
    }

    // Ejecutar la función inmediatamente al cargar el archivo
    obtenerFotoCiudad();
