import React from 'react'
import SideMenu from '../components/SideMenu'
import './Landing.css'


export default function Landing() {
  return (
    <div className="landing-page">
      
      <SideMenu />

      <div className="landing-blank">
        <h1>Bienvenido a la landing</h1>
      </div>
    </div>
  )
}
