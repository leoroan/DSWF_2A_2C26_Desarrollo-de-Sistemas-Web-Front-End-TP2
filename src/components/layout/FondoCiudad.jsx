
import { useState, useEffect } from 'react';
import { obtenerFotoCiudad } from '../service/fondo'; // Apuntando a tu carpeta service

// 1. Añadimos { children } como parámetro de la función
export default function FondoCiudad({ children }) {
    const [fotoData, setFotoData] = useState({
        url: '',
        autor: '',
        linkAutor: '',
        esOffline: false
    });

    useEffect(() => {
        async function cargarImagen() {
            const datos = await obtenerFotoCiudad();
            setFotoData(datos);
        }
        cargarImagen();
    }, []);

    const estiloFondo = {
        backgroundImage: fotoData.url ? `url('${fotoData.url}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflowY: 'auto' // Permite hacer scroll si la lista de miembros es muy larga
    };

    return (
        <div style={estiloFondo} id="capa-fondo">
            
            {/* 2. Renderizamos 'children' aquí para que el contenido de la página se dibuje sobre el fondo */}
            {children}

            <div id="capa-creditos" style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10 }}>
                {fotoData.esOffline ? (
                    <span className="creditos">{fotoData.autor}</span>
                ) : (
                    fotoData.autor && (
                        <a 
                            className="creditos" 
                            href={fotoData.linkAutor} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Foto por {fotoData.autor} en Unsplash
                        </a>
                    )
                )}
            </div>
        </div>
    );
}
