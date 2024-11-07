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
  const [usuarios, setUsuarios] = useState([])
  const [rol, setRol] = useState('')

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
      const datos = await peticion.json();
      if (datos.rol == 'ADMINISTRADOR'){
        setRol('ADMINISTRADOR')
      }else{
        setRol('USUARIO')
      }
      setLogueado(true)
      obtenerUsuarios()
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
        obtenerUsuarios()
      } else {
        alert('No se pudo registrar el usuario')
      }
    }

  async function validar() {
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
      obtenerUsuarios()
    }
  }

  async function obtenerUsuarios() {
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
    const peticion = await fetch('http://localhost:3000/usuarios', { credentials: 'include' })
    if (peticion.ok) {
      setUsuarios((await peticion.json()))
    }
  }

  useEffect(() => {
    validar()
  }, [])

  async function eliminarUsuario(id) {
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
    const peticion = await fetch('http://localhost:3000/usuarios?id=' + id, { credentials: 'include', method: 'DELETE' })
    if (peticion.ok) {
      alert('Usuario eliminado')
      obtenerUsuarios()
    }else{
      alert('No se pudo eliminar el usuario')
    }
  }

  // Si el usuario esta logueado, se muestra el componente conversor

  if (logueado) {

    return (<div>
      {rol == 'ADMINISTRADOR' ?(
        <>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.usuario}</td>
                <td>{usuario.contraseña}</td>
                <td>
                  <button onClick={() =>eliminarUsuario(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h1>Registro</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={claveRegistro} onChange={cambiarClaveRegistro} />
      <button onClick={registro}>Registrar</button>
      </>
    ): null}
      <Conversor/>
    </div>) 
  }

  return (
    <>
      <h1>Inicio de sesión</h1>
      <input placeholder='Usuario' type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
      <input placeholder='Clave' type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
      <button onClick={ingresar}>Ingresar</button>
    </>
  )
}

export default App
