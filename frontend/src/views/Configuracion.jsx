import React from 'react'
import SideMenu from '../components/SideMenu'
import './Configuracion.css'

export default function Configuracion() {
  return (
    <div className="settings">
        <SideMenu />
      <h1>Configuración</h1>
      <p className="muted">Actualiza tu perfil y credenciales. (No fufa pero es bonito o eso creo)</p>

      <section className="card">
        <h2>Perfil</h2>
        <div className="grid">
          <div className="field">
            <label htmlFor="nombre">Nombre de usuario</label>
            <input id="nombre" type="text" placeholder="Ej. jgrima" />
          </div>
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input id="email" type="email" placeholder="tucorreo@empresa.com" />
          </div>
        </div>
        <div className="actions">
          <button className="btn ghost" disabled>Cancelar</button>
          <button className="btn primary" disabled>Guardar cambios</button>
        </div>
      </section>

      <section className="card">
        <h2>Seguridad</h2>
        <div className="grid">
          <div className="field">
            <label htmlFor="pass-actual">Contraseña actual</label>
            <input id="pass-actual" type="password" placeholder="••••••••" />
          </div>
          <div className="field">
            <label htmlFor="pass-nueva">Nueva contraseña</label>
            <input id="pass-nueva" type="password" placeholder="Mín. 8 caracteres" />
          </div>
          <div className="field">
            <label htmlFor="pass-repite">Repite la nueva</label>
            <input id="pass-repite" type="password" placeholder="Repite la nueva" />
          </div>
        </div>
        <div className="tips">
          <small>Usa al menos 8 caracteres, combinando letras, números y símbolos.</small>
        </div>
        <div className="actions">
          <button className="btn ghost" disabled>Cancelar</button>
          <button className="btn primary" disabled>Actualizar contraseña</button>
        </div>
      </section>

      <section className="card danger">
        <h2>Sesión</h2>
        <p className="muted">Cierra sesión en este dispositivo.</p>
        <div className="actions">
          <button className="btn danger" disabled>Cerrar sesión</button>
        </div>
      </section>
    </div>
  );
}
