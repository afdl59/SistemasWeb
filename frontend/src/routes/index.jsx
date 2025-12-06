import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import Landing from '../views/Landing'
import BolsaTrabajo from '../views/BolsaTrabajo'
import ManualUso from '../views/ManualUso'
import LineasNegocio from '../views/LineasNegocio'
import Settings from '../views/Settings'

export default function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Mostrar el login por defecto en la raíz */}
				<Route path="/login" element={<Login />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="/bolsaTrabajo" element={<BolsaTrabajo />} />
				<Route path="/manualUso" element={<ManualUso />} />
				<Route path="/LineasNegocio" element={<LineasNegocio />} />
				<Route path="/Configuracion" element={<Settings />} />
				<Route path="/Settings" element={<Settings />} />

				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
				
			</Routes>
		</BrowserRouter>
	)
}

