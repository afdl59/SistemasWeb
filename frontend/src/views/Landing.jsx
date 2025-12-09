import React, { useState, useEffect } from 'react';
import SideMenu from '../components/SideMenu';
import * as dashboardService from '../services/dashboardService';
import './Landing.css';

export default function Landing() {
  const [metrics, setMetrics] = useState(null);
  const [clientesPorLinea, setClientesPorLinea] = useState([]);
  const [topClientes, setTopClientes] = useState([]);
  const [evolucionIngresos, setEvolucionIngresos] = useState([]);
  const [ticketsPorTipo, setTicketsPorTipo] = useState([]);
  const [reunionesStats, setReunionesStats] = useState([]);
  const [clientesRiesgo, setClientesRiesgo] = useState([]);
  const [satisfaccion, setSatisfaccion] = useState(null);
  const [actividadReciente, setActividadReciente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vistaActual, setVistaActual] = useState('general');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        metricsData,
        clientesLineaData,
        topClientesData,
        evolucionData,
        ticketsData,
        reunionesData,
        riesgoData,
        satisfaccionData,
        actividadData
      ] = await Promise.all([
        dashboardService.getDashboardMetrics(),
        dashboardService.getClientesPorLinea(),
        dashboardService.getTopClientes(),
        dashboardService.getEvolucionIngresos(),
        dashboardService.getTicketsPorTipo(),
        dashboardService.getReunionesStats(),
        dashboardService.getClientesRiesgo(),
        dashboardService.getSatisfaccionMetrics(),
        dashboardService.getActividadReciente()
      ]);

      setMetrics(metricsData);
      setClientesPorLinea(clientesLineaData);
      setTopClientes(topClientesData);
      setEvolucionIngresos(evolucionData);
      setTicketsPorTipo(ticketsData);
      setReunionesStats(reunionesData);
      setClientesRiesgo(riesgoData);
      setSatisfaccion(satisfaccionData);
      setActividadReciente(actividadData);
    } catch (err) {
      console.error('Error al cargar datos del dashboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="landing-page">
        <SideMenu />
        <div className="dashboard-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando métricas del dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-page">
        <SideMenu />
        <div className="dashboard-container">
          <div className="error-message">
            <h2>Error al cargar el dashboard</h2>
            <p>{error}</p>
            <button onClick={loadDashboardData} className="btn-retry">Reintentar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <SideMenu />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>Panel de Métricas</h1>
              <p className="dashboard-subtitle">Inteligencia de Negocio y Rendimiento</p>
            </div>
            <div className="header-stats">
              <div className="quick-stat">
                <span className="stat-label">Ingresos Totales</span>
                <span className="stat-value">{formatCurrency(metrics?.ingresos_totales || 0)}</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Clientes Activos</span>
                <span className="stat-value">{metrics?.total_clientes_activos || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className="pestanas">
          <button 
            className={vistaActual === 'general' ? 'activa' : ''} 
            onClick={() => setVistaActual('general')}
          >
            General
          </button>
          <button 
            className={vistaActual === 'clientes' ? 'activa' : ''} 
            onClick={() => setVistaActual('clientes')}
          >
            Clientes
          </button>
          <button 
            className={vistaActual === 'facturacion' ? 'activa' : ''} 
            onClick={() => setVistaActual('facturacion')}
          >
            Facturación
          </button>
          <button 
            className={vistaActual === 'soporte' ? 'activa' : ''} 
            onClick={() => setVistaActual('soporte')}
          >
            Soporte
          </button>
          <button 
            className={vistaActual === 'actividad' ? 'activa' : ''} 
            onClick={() => setVistaActual('actividad')}
          >
            Actividad
          </button>
        </div>

        {vistaActual === 'general' && (
        <>
        {/* KPI Cards - Métricas Principales */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Clientes Activos</span>
              <span className="kpi-badge badge-blue">{metrics?.total_clientes_activos || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.total_clientes_activos || 0}</div>
              <div className="kpi-meta">de {metrics?.total_clientes || 0} clientes totales</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Activo</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Ingresos Totales</span>
              <span className="kpi-badge badge-green">Pagado</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.ingresos_totales || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_pagadas || 0} facturas procesadas</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Ingresos</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Facturas Pendientes</span>
              <span className="kpi-badge badge-yellow">{metrics?.facturas_pendientes_count || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.facturas_pendientes || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_pendientes_count || 0} esperando pago</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-neutral">→ Pendiente</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Facturas Vencidas</span>
              <span className="kpi-badge badge-red">{metrics?.facturas_vencidas_count || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.facturas_vencidas || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_vencidas_count || 0} fuera de plazo</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-down">↓ Vencido</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Contratos Vigentes</span>
              <span className="kpi-badge badge-blue">{metrics?.contratos_vigentes || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.contratos_vigentes || 0}</div>
              <div className="kpi-meta">{formatCurrency(metrics?.valor_contratos_vigentes || 0)} en valor</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Contratos</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Tickets Abiertos</span>
              <span className="kpi-badge badge-orange">{metrics?.tickets_abiertos || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.tickets_abiertos || 0}</div>
              <div className="kpi-meta">{metrics?.tickets_alta_prioridad || 0} alta prioridad</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-neutral">→ Soporte</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Reuniones Programadas</span>
              <span className="kpi-badge badge-purple">{metrics?.reuniones_programadas || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.reuniones_programadas || 0}</div>
              <div className="kpi-meta">{metrics?.reuniones_realizadas || 0} completadas</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Reuniones</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Pagos Retrasados</span>
              <span className="kpi-badge badge-red">{metrics?.pagos_retrasados || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.pagos_retrasados || 0}</div>
              <div className="kpi-meta">{Math.round(metrics?.promedio_dias_retraso || 0)} días promedio</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-down">↓ Retraso</div>
            </div>
          </div>
        </div>
        </>
        )}

        {vistaActual === 'clientes' && (
        <>
        {/* Charts Section */}
        <div className="charts-grid">
          {/* Top Clientes */}
          <div className="chart-card chart-large">
            <div className="chart-header">
              <h2 className="chart-title">Mejores Clientes por Facturación</h2>
              <span className="chart-subtitle">Ordenados por facturación total</span>
            </div>
            <div className="chart-content">
              <div className="bar-chart">
                {topClientes.map((cliente, index) => (
                  <div key={cliente.id} className="bar-item">
                    <div className="bar-info">
                      <span className="bar-rank">#{index + 1}</span>
                      <span className="bar-label">{cliente.nombre}</span>
                      <span className="bar-value">{formatCurrency(cliente.total_facturado)}</span>
                    </div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill" 
                        style={{
                          width: `${(cliente.total_facturado / topClientes[0]?.total_facturado * 100) || 0}%`
                        }}
                      >
                        <span className="bar-percentage">{cliente.num_facturas} facturas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Distribución por Línea de Negocio */}
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Distribución por Líneas de Negocio</h2>
              <span className="chart-subtitle">Segmentación de clientes</span>
            </div>
            <div className="chart-content">
              <div className="pie-chart-container">
                <svg viewBox="0 0 200 200" className="pie-chart">
                  {clientesPorLinea.map((linea, index) => {
                    const colors = ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6', '#bdc3c7', '#ecf0f1'];
                    const total = clientesPorLinea.reduce((sum, l) => sum + l.cantidad, 0);
                    const percentage = (linea.cantidad / total) * 100;
                    
                    let currentAngle = 0;
                    for (let i = 0; i < index; i++) {
                      currentAngle += (clientesPorLinea[i].cantidad / total) * 360;
                    }
                    
                    const angle = (linea.cantidad / total) * 360;
                    const x1 = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
                    const y1 = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);
                    const x2 = 100 + 80 * Math.cos((currentAngle + angle - 90) * Math.PI / 180);
                    const y2 = 100 + 80 * Math.sin((currentAngle + angle - 90) * Math.PI / 180);
                    const largeArc = angle > 180 ? 1 : 0;
                    
                    return (
                      <path
                        key={index}
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={colors[index % colors.length]}
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
                <div className="pie-legend">
                  {clientesPorLinea.map((linea, index) => {
                    const colors = ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6', '#bdc3c7', '#ecf0f1'];
                    return (
                      <div key={index} className="legend-item">
                        <span className="legend-color" style={{backgroundColor: colors[index % colors.length]}}></span>
                        <span className="legend-label">{linea.linea}</span>
                        <span className="legend-value">{linea.cantidad} ({formatPercentage(linea.porcentaje)})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Evolución de Ingresos */}
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Evolución de Ingresos</h2>
              <span className="chart-subtitle">Últimos 6 meses</span>
            </div>
            <div className="chart-content">
              <div className="line-chart">
                {evolucionIngresos.length > 0 ? (
                  <>
                    <div className="line-chart-grid">
                      {evolucionIngresos.map((data, index) => {
                        const maxValue = Math.max(...evolucionIngresos.map(d => parseFloat(d.total)));
                        const height = (parseFloat(data.total) / maxValue) * 100;
                        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
                        const [year, month] = data.mes.split('-');
                        const monthLabel = monthNames[parseInt(month) - 1];
                        
                        return (
                          <div key={index} className="line-chart-bar">
                            <div className="bar-wrapper">
                              <div 
                                className="bar" 
                                style={{height: `${height}%`}}
                                title={formatCurrency(data.total)}
                              >
                                <span className="bar-tooltip">{formatCurrency(data.total)}</span>
                              </div>
                            </div>
                            <span className="bar-label-x">{monthLabel}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="no-data">No hay datos disponibles</p>
                )}
              </div>
            </div>
          </div>

          {/* Tickets por Tipo */}
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Análisis de Tickets de Soporte</h2>
              <span className="chart-subtitle">Por categoría y estado</span>
            </div>
            <div className="chart-content">
              <div className="horizontal-bar-chart">
                {ticketsPorTipo.map((ticket, index) => {
                  const maxValue = Math.max(...ticketsPorTipo.map(t => t.cantidad));
                  const percentage = (ticket.cantidad / maxValue) * 100;
                  
                  return (
                    <div key={index} className="h-bar-item">
                      <div className="h-bar-label">{ticket.tipo}</div>
                      <div className="h-bar-container">
                        <div className="h-bar-fill" style={{width: `${percentage}%`}}>
                          <span className="h-bar-text">{ticket.cantidad} tickets</span>
                        </div>
                      </div>
                      <div className="h-bar-stats">
                        <span className="stat-active">{ticket.activos} activos</span>
                        <span className="stat-resolved">{ticket.resueltos} resueltos</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estadísticas de Reuniones */}
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Eficiencia de Reuniones</h2>
              <span className="chart-subtitle">Tasas de finalización por tipo</span>
            </div>
            <div className="chart-content">
              <div className="stats-grid">
                {reunionesStats.map((reunion, index) => (
                  <div key={index} className="stat-card">
                    <h3 className="stat-title">{reunion.tipo}</h3>
                    <div className="stat-value">{reunion.total}</div>
                    <div className="stat-breakdown">
                      <div className="stat-row">
                        <span className="stat-label">Realizadas:</span>
                        <span className="stat-number">{reunion.realizadas}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Programadas:</span>
                        <span className="stat-number">{reunion.programadas}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Canceladas:</span>
                        <span className="stat-number">{reunion.canceladas}</span>
                      </div>
                    </div>
                    <div className="stat-footer">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${reunion.tasa_realizacion}%`}}
                        ></div>
                      </div>
                      <span className="progress-label">{formatPercentage(reunion.tasa_realizacion)} completadas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Clientes en Riesgo */}
          <div className="chart-card chart-large">
            <div className="chart-header">
              <h2 className="chart-title">Evaluación de Riesgo</h2>
              <span className="chart-subtitle">Clientes que requieren atención</span>
            </div>
            <div className="chart-content">
              <div className="risk-table">
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Línea de Negocio</th>
                      <th>Fact. Vencidas</th>
                      <th>Monto Vencido</th>
                      <th>Tickets Abiertos</th>
                      <th>Pagos Retrasados</th>
                      <th>Puntuación de Riesgo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesRiesgo.length > 0 ? (
                      clientesRiesgo.map((cliente, index) => (
                        <tr key={cliente.id} className={`risk-level-${cliente.score_riesgo > 10 ? 'high' : cliente.score_riesgo > 5 ? 'medium' : 'low'}`}>
                          <td className="cliente-name">{cliente.nombre}</td>
                          <td>{cliente.linea || 'N/A'}</td>
                          <td className="text-center">{cliente.facturas_vencidas}</td>
                          <td className="text-right">{formatCurrency(cliente.monto_vencido)}</td>
                          <td className="text-center">{cliente.tickets_abiertos}</td>
                          <td className="text-center">{cliente.pagos_retrasados}</td>
                          <td className="text-center">
                            <span className={`risk-score score-${cliente.score_riesgo > 10 ? 'high' : cliente.score_riesgo > 5 ? 'medium' : 'low'}`}>{cliente.score_riesgo}</span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center no-risk">Todos los clientes en buen estado</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Preferencias de Contacto */}
          <div className="chart-card">
            <div className="chart-header">
              <h2 className="chart-title">Preferencias de Clientes</h2>
              <span className="chart-subtitle">Perspectivas de comunicación</span>
            </div>
            <div className="chart-content">
              <div className="preferences-grid">
                <div className="preference-section">
                  <h3>Método de Contacto</h3>
                  {satisfaccion?.metodoContacto?.map((metodo, index) => (
                    <div key={index} className="preference-item">
                      <span className="pref-label">{metodo.metodo_contacto}</span>
                      <div className="pref-bar">
                        <div 
                          className="pref-fill" 
                          style={{
                            width: `${(metodo.cantidad / satisfaccion.metodoContacto[0]?.cantidad * 100) || 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="pref-value">{metodo.cantidad}</span>
                    </div>
                  ))}
                </div>

                <div className="preference-section">
                  <h3>Idioma</h3>
                  {satisfaccion?.idioma?.map((lang, index) => (
                    <div key={index} className="preference-item">
                      <span className="pref-label">{lang.idioma}</span>
                      <div className="pref-bar">
                        <div 
                          className="pref-fill" 
                          style={{
                            width: `${(lang.cantidad / satisfaccion.idioma[0]?.cantidad * 100) || 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="pref-value">{lang.cantidad}</span>
                    </div>
                  ))}
                </div>

                <div className="preference-section">
                  <h3>Frecuencia de Contacto</h3>
                  {satisfaccion?.frecuencia?.map((freq, index) => (
                    <div key={index} className="preference-item">
                      <span className="pref-label">{freq.frecuencia_contacto}</span>
                      <div className="pref-bar">
                        <div 
                          className="pref-fill" 
                          style={{
                            width: `${(freq.cantidad / satisfaccion.frecuencia[0]?.cantidad * 100) || 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="pref-value">{freq.cantidad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}

        {vistaActual === 'actividad' && (
        <>
        <div className="charts-grid">
          {/* Actividad Reciente */}
          <div className="chart-card chart-large">
            <div className="chart-header">
              <h2 className="chart-title">Actividad Reciente</h2>
              <span className="chart-subtitle">Últimas actualizaciones</span>
            </div>
            <div className="chart-content">
              <div className="activity-feed">
                {actividadReciente.length > 0 ? (
                  actividadReciente.map((item, index) => (
                    <div key={index} className={`activity-item activity-${item.tipo}`}>
                      <div className={`activity-marker marker-${item.tipo}`}></div>
                      <div className={`activity-marker marker-${item.tipo}`}></div>
                      <div className="activity-content">
                        <div className="activity-title">
                          {item.tipo === 'reunion' && `Reunión: ${item.detalle}`}
                          {item.tipo === 'ticket' && `Ticket de Soporte: ${item.detalle}`}
                          {item.tipo === 'factura' && `Factura: ${item.detalle}`}
                        </div>
                        <div className="activity-meta">
                          <span className="activity-cliente">{item.cliente}</span>
                          <span className="activity-separator">•</span>
                          <span className="activity-date">{item.fecha}</span>
                          {item.estado && <span className={`activity-status status-${item.estado.toLowerCase()}`}>{item.estado}</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No hay actividad reciente</p>
                )}
              </div>
            </div>
          </div>
        </div>
        </>
        )}

        {vistaActual === 'facturacion' && (
        <>
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Ingresos Totales</span>
              <span className="kpi-badge badge-green">Pagado</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.ingresos_totales || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_pagadas || 0} facturas procesadas</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Ingresos</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Facturas Pendientes</span>
              <span className="kpi-badge badge-yellow">{metrics?.facturas_pendientes_count || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.facturas_pendientes || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_pendientes_count || 0} esperando pago</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-neutral">→ Pendiente</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Facturas Vencidas</span>
              <span className="kpi-badge badge-red">{metrics?.facturas_vencidas_count || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{formatCurrency(metrics?.facturas_vencidas || 0)}</div>
              <div className="kpi-meta">{metrics?.facturas_vencidas_count || 0} fuera de plazo</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-down">↓ Vencido</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Pagos Retrasados</span>
              <span className="kpi-badge badge-red">{metrics?.pagos_retrasados || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.pagos_retrasados || 0}</div>
              <div className="kpi-meta">{Math.round(metrics?.promedio_dias_retraso || 0)} días promedio</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-down">↓ Retraso</div>
            </div>
          </div>
        </div>
        </>
        )}

        {vistaActual === 'soporte' && (
        <>
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Tickets Abiertos</span>
              <span className="kpi-badge badge-orange">{metrics?.tickets_abiertos || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.tickets_abiertos || 0}</div>
              <div className="kpi-meta">{metrics?.tickets_alta_prioridad || 0} alta prioridad</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-neutral">→ Soporte</div>
            </div>
          </div>

          <div className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">Reuniones Programadas</span>
              <span className="kpi-badge badge-purple">{metrics?.reuniones_programadas || 0}</span>
            </div>
            <div className="kpi-body">
              <div className="kpi-main-value">{metrics?.reuniones_programadas || 0}</div>
              <div className="kpi-meta">{metrics?.reuniones_realizadas || 0} completadas</div>
            </div>
            <div className="kpi-footer">
              <div className="kpi-trend trend-up">↑ Reuniones</div>
            </div>
          </div>
        </div>
        </>
        )}

      </div>
    </div>
  );
}
