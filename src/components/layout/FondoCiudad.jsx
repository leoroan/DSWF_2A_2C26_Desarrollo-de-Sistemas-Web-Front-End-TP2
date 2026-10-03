// src/components/layout/FondoCiudad.jsx
import { useState, useEffect } from 'react';
import { obtenerFotoCiudad } from '../../services/fondo'; 

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

    const estiloBanner = {
        backgroundImage: fotoData.url ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${fotoData.url}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',            // Ocupa todo el ancho disponible
        height: '250px',          // Limitamos el largo/alto (puedes cambiarlo a 300px si lo quieres más alto)
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',   // Alinea la foto personal hacia la parte inferior del banner
        justifyContent: 'center', // Centra la foto horizontalmente
        paddingBottom: '0px',
        marginBottom: '50px'      // Espacio abajo para que el contenido no se encime al flotar la foto
    };

    return (
        <div style={estiloBanner} id="banner-ciudad">
            
            {/* Aquí adentro caerá la foto de tus compañeros */}
            {children}

            {/* Créditos en la esquina inferior derecha del banner */}
            <div style={{ position: 'absolute', bottom: '10px', right: '15px', zIndex: 10, fontSize: '11px' }}>
                {!fotoData.esOffline && fotoData.autor && (
                    <a 
                        href={fotoData.linkAutor} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#fff', textDecoration: 'none', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '4px' }}
                    >
                        Foto por {fotoData.autor}
                    </a>
                )}
            </div>
        </div>
    );
}
