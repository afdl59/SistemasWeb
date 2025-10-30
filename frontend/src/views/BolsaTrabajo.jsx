import React from 'react'
import SideMenu from '../components/SideMenu'
import './BolsaTrabajo.css'


export default function BolsaTrabajo() {
  return(
        <div className="bolsaTrabajo-page">
          
          <SideMenu />
    
          <div className="bolsaTrabajo-blank">
              <h1>Bolsa de Trabajo</h1>
              <h2>Bienvenido a la bolsa de trabajo, donde podrás ser esclavizado voluntariamente!!! :DDDD</h2>
              <button>Publicar Trabajo</button>

              <div className="marcoDeTrabajo">
                <h2>Trabajo 1: </h2><h2>algoRaro</h2>
                <div className="linea">
                  <p>Descripción del trabajo 1:</p><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>

              <div className="marcoDeTrabajo">
                <h2>Trabajo 2: </h2><h2>algoMásRaro</h2>
                <div className="linea">
                  <p>Descripción del trabajo 2: </p><p> Probando, todavía no hay datos disponibles ya que esto solo es un frontend.</p>
                </div>
              </div>

          </div>
          
        </div>
  )
}