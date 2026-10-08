// src/components/layout/FondoCiudad.jsx
import { useState, useEffect } from 'react'
import { obtenerFotoCiudad } from '../../services/fondo'

export default function FondoCiudad({ ciudad = 'Buenos Aires', children }) {
  const [fotoData, setFotoData] = useState({
    url: '',
    autor: '',
    linkAutor: '',
    esOffline: false,
  })

  useEffect(() => {
    let activo = true
    async function cargarImagen() {
      const datos = await obtenerFotoCiudad(ciudad)
      if (activo) setFotoData(datos)
    }
    cargarImagen()
    return () => {
      activo = false
    }
  }, [ciudad])

  const estiloBanner = {
    backgroundImage: fotoData.url
      ? `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('${fotoData.url}')`
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '250px',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '0px',
    marginBottom: '50px',
  }

  return (
    <div style={estiloBanner} id="banner-ciudad">
      {children}

      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '15px',
          zIndex: 10,
          fontSize: '11px',
        }}
      >
        {!fotoData.esOffline && fotoData.autor && (
          <a
            href={fotoData.linkAutor}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              textDecoration: 'none',
              background: 'rgba(0,0,0,0.4)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            Foto por {fotoData.autor}
          </a>
        )}
      </div>
    </div>
  )
}
