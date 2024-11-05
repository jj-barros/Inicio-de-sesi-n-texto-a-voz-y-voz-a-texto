/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import './App.css'
import { useEffect, useState } from 'react'
import Conversor from './Conversor'

function App() {
  //hook,
  const [usuario, setUsuario] = useState('') //Estado para guardar el usuario
  const [clave, setClave] = useState('') //Estado para guardar la clave
  const [usuarioRegistro, setUsuarioRegistro] = useState('') //Estado para guardar el usuario
  const [claveRegistro, setClaveRegistro] = useState('') //Estado para guardar la clave
  const [logueado, setLogueado] = useState(false) //Estado para saber si el usuario está logueado

  //Funcion para cambiar el valor del usuario  
  function cambiarUsuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value)
  }

  //Funcion para cambiar el valor de la clave
  function cambiarClaveRegistro(evento) {
    setClaveRegistro(evento.target.value)
  }

    //Funcion para cambiar el valor del usuario  
    function cambiarUsuario(evento) {
      setUsuario(evento.target.value)
    }
  
    //Funcion para cambiar el valor de la clave
    function cambiarClave(evento) {
      setClave(evento.target.value)
    }

  //Funcion para ingresar al dar click en el boton
  async function ingresar() {
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    } else {
      alert('Usuario o clave incorrectos')
    }
  }

    //Funcion para registrar al dar click en el boton
    async function registro() {
      // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
      const peticion = await fetch('http://localhost:3000/registrar?usuario=' + usuarioRegistro + '&clave=' + claveRegistro, { credentials: 'include' })
      if (peticion.ok) {
        alert('Usuario registrado')
        setLogueado(true)
      } else {
        alert('No se pudo registrar el usuario')
      }
    }

  async function validar() {
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
    }
  }

  useEffect(() => {
    validar()
  }, [])

  // Si el usuario esta logueado, se muestra el componente conversor

  if (logueado) {
    return <Conversor/>
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
      
      <h1>Registro</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={claveRegistro} onChange={cambiarClaveRegistro} />
      <button onClick={registro}>Registrar</button>
    </>
  )
}

export default App
