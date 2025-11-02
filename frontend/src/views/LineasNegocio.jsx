import React from 'react'
import SideMenu from '../components/SideMenu'
import './LineasNegocio.css'

export default function BolsaTrabajo() {

  return(

        <div class="lineasNegocio-page">
            <SideMenu />
            <div class="lineasNegocio-content">
                <h1>Líneas de Negocio</h1>
                <hr />
                <div class="tablonNegocio">
                    <table class="TablonTitulos">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Última actualización</th>
                            <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Logística</td>
                                <td>Almacén y transporte</td>
                                <td>
                                    <label class="switch">
                                    <input type="checkbox" checked disabled/>
                                    <span class="slider"></span>
                                    </label>
                                </td>
                                <td>31/10/2025</td>
                                <td><button class="btn-edit" disabled>Editar</button></td>
                            </tr>

                            <tr>
                                <td>Industrial</td>
                                <td>Operarios producción</td>
                                <td>
                                    <label class="switch">
                                    <input type="checkbox" checked disabled/>
                                    <span class="slider"></span>
                                    </label>
                                </td>
                                <td>30/10/2025</td>
                                <td><button class="btn-edit" disabled>Editar</button></td>
                            </tr>

                            <tr>
                                <td>Retail</td>
                                <td>Tiendas y comercio</td>
                                <td>
                                    <label class="switch">
                                    <input type="checkbox" disabled/>
                                    <span class="slider"></span>
                                    </label>
                                </td>
                                <td>29/10/2025</td>
                                <td><button class="btn-edit" disabled>Editar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
