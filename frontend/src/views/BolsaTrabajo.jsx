import React from 'react'
import SideMenu from '../components/SideMenu'
import './BolsaTrabajo.css'

export default function BolsaTrabajo() {

  const funcbtn = () => {
    const mensaje = document.getElementById("mensaje");
    mensaje.classList.remove("oculto");
    mensaje.classList.add("visible");
    setTimeout(() => {
      mensaje.classList.remove("visible");
      mensaje.classList.add("oculto");
    }, 2000);
  }

  return(
    <div className="bolsaTrabajo-page">
      <SideMenu />
      
      <div className="bolsaTrabajo-content">

        <h1>Bolsa de Trabajo</h1>
        <p>Todos los comentarios de texto a continuación son de ejemplo, ya que no tenemos una base de datos real todavía.</p>

        <div className="manual-section">
          <h2>Bienvenido a la bolsa de trabajo</h2>
          <p>Aquí podrás ver las ofertas disponibles y aplicar a ellas.</p>
          <button id="btn" className="btn-primary" onClick={funcbtn}>Crear bolsa</button>
          <p className='oculto message' id="mensaje">La bolsa fue creada con éxito ✅</p>
        </div>

        {/* Trabajo 1 */}
        <div className="manual-section">
          <h2>Trabajo 1: algoRaro</h2>
          <p><strong>Descripción del trabajo:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="btn-secondary">Aplicar</button>
        </div>

        {/* Trabajo 2 */}
        <div className="manual-section">
          <h2>Trabajo 2: algoMásRaro</h2>
          <p><strong>Descripción del trabajo:</strong> Probando, todavía no hay datos disponibles ya que esto solo es un frontend.</p>
          <button className="btn-secondary">Aplicar</button>
        </div>

      </div>
    </div>
  )
}
