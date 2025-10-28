import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import Landing from '../views/Landing'

export default function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Mostrar el login por defecto en la raíz */}
				<Route path="/login" element={<Login />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</BrowserRouter>
	)
}
