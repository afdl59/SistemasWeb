import React from 'react'
import SideMenu from '../components/SideMenu'
import './ManualUso.css'

export default function ManualUso() {

  return (
    <div className="manualUso-page">
      
      <SideMenu />

      <div className="manualUso-content">
        <h1>Manual de Uso del CRM</h1>

        <p>
            Bienvenido al manual de uso del CRM. Aquí encontrarás una guía
            completa sobre las funcionalidades disponibles y cómo utilizarlas de manera efectiva.
        </p>

        <section className="manual-section">
          <h2>📊 Dashboard</h2>
          <p>
            Es la página principal del sistema. Aquí se muestran indicadores y datos generales
            sobre la actividad de la empresa y el uso de la plataforma.
          </p>
          <ul>
            <li>Resumen de pedidos</li>
            <li>Actividad reciente</li>
            <li>Gráficas e indicadores (en desarrollo)</li>
            <li>Notificaciones relevantes</li>
          </ul>
          <p>Se puede verificar esta pantalla al iniciar sesión para conocer el estado general.</p>
        </section>

        <section className="manual-section">
          <h2>🧾 Gestión de Pedidos</h2>
          <p>Panel dedicado a administrar solicitudes y pedidos de clientes.</p>
          <ul>
            <li><strong>Crear pedido:</strong> Registrar un nuevo pedido mediante formulario.</li>
            <li><strong>Editar pedido:</strong> Modificar información existente.</li>
            <li><strong>Ver detalles:</strong> Consultar información completa.</li>
            <li><strong>Actualizar estado:</strong> Ej. Pendiente → En proceso → Finalizado.</li>
          </ul>
        </section>

        <section className="manual-section">
          <h2>👥 Bolsa de Trabajo</h2>
          <p>Sección enfocada en el proceso de reclutamiento.</p>
          <ul>
            <li>Ver vacantes disponibles</li>
            <li>Leer descripción y requisitos</li>
            <li><strong>Aplicar</strong> a una vacante</li>
          </ul>
          <p>Función utilizada principalmente por el departamento de Recursos Humanos.</p>
        </section>

        <section className="manual-section">
          <h2>🔐 Gestión de Usuarios</h2>
          <p><strong>Sección reservada para administradores.</strong></p>
          <ul>
            <li>Crear nuevos usuarios</li>
            <li>Editar información de usuarios</li>
            <li>Asignar o revocar permisos</li>
            <li>Desactivar usuarios</li>
          </ul>
        </section>

        <section className="manual-section">
          <h2>🏢 Líneas de Negocio</h2>
          <p>Permite administrar las diferentes áreas y servicios de la empresa.</p>
          <ul>
            <li>Ver líneas de negocio registradas</li>
            <li>Crear nuevas áreas (próximamente)</li>
            <li>Actualizar información (en desarrollo)</li>
          </ul>
        </section>

        <section className="manual-section">
          <h2>📘 Manual de Uso</h2>
          <p>
            Ested está aqui 📍
          </p>
        </section>

        <section className="manual-section">
          <h2>⚙️ Configuración</h2>
          <p>Opciones generales para personalizar o administrar el sistema.</p>
          <ul>
            <li>Modificar datos personales</li>
            <li>Cambiar contraseña</li>
            <li>Ajustes generales del CRM (en desarrollo)</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

