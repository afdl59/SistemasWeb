import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import ChangePassword from '../views/ChangePassword'
import Landing from '../views/Landing'
import BolsaTrabajo from '../views/BolsaTrabajo'
import ManualUso from '../views/ManualUso'
import LineasNegocio from '../views/LineasNegocio'
import Settings from '../views/Settings'
import Users from '../views/Users'
import Clientes from '../views/Clientes'

export default function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Mostrar el login por defecto en la raíz */}
				<Route path="/login" element={<Login />} />
				<Route path="/change-password" element={<ChangePassword />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="/bolsaTrabajo" element={<BolsaTrabajo />} />
				<Route path="/manualUso" element={<ManualUso />} />
				<Route path="/LineasNegocio" element={<LineasNegocio />} />
				<Route path="/Clientes" element={<Clientes />} />
				<Route path="/Clientes/:id" element={<Clientes />} />
				<Route path="/Configuracion" element={<Settings />} />
				<Route path="/Settings" element={<Settings />} />
				<Route path="/usuarios" element={<Users />} />

				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
				
			</Routes>
		</BrowserRouter>
	)
}

