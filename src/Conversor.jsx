import './App.css'
import { useState } from 'react'

function Conversor() {
  const [texto, setTexto] = useState('')
  const [voz, setVoz] = useState('')

  function cambiarTexto(evento) {
    setTexto(evento.target.value)
  }

  function textoAvoz() {
    const configuracion = new SpeechSynthesisUtterance(texto)
    speechSynthesis.speak(configuracion)
  }

  function vozATexto() {
    const agente = new window.webkitSpeechRecognition()
    agente.start()
    agente.onresult = resultado
  }
  function resultado(informacion) {
    console.log(informacion.results[0][0].transcript)
    setVoz(informacion.results[0][0].transcript)
    //informacion.results[0][0].transcript
  }

    return (
      <>
        <h1>Conversor TTS y STT</h1>
        <h2>Conversor texto a voz</h2>
        <input type="text" value={texto} onChange={cambiarTexto}/>
        <button onClick={textoAvoz}>convertir</button>
        <h2>Conversor voz a texto</h2>
        <button onClick={vozATexto}>Grabar</button>
        {voz}
      </>
    )
  }

export default Conversor
