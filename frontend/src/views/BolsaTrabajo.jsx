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
    
          <div className="bolsaTrabajo-blank">
              <h1>Bolsa de Trabajo</h1><p> Todos los comentarios de texto a continuación son de ejemplo, ya que no tenemos una base de datos real todavía</p>
              <h2>Bienvenido a la bolsa de trabajo, donde podrás ser esclavizado voluntariamente!!! :DDDD</h2>
              <button id="btn" onclick={funcbtn} >Crear bolsa</button>
              <p className='oculto' id="mensaje">La bolsa fue creada con exito</p>



              <div className="marcoDeTrabajo">
                <h2>Trabajo 1: </h2><h2>algoRaro</h2>
                <div className="linea">
                  <p>Descripción del trabajo 1:</p><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button>aplicar</button>
                </div>
              </div>

              <div className="marcoDeTrabajo">
                <h2>Trabajo 2: </h2><h2>algoMásRaro</h2>
                <div className="linea">
                  <p>Descripción del trabajo 2: </p><p> Probando, todavía no hay datos disponibles ya que esto solo es un frontend.</p>
                  <button>aplicar</button>
                </div>
              </div>
              

          </div>
          
        </div>
  )
}