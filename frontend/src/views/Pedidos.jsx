import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFileExcel, FaSearch, FaFilter } from 'react-icons/fa';
import SideMenu from '../components/SideMenu';
import PedidoModal from '../components/PedidoModal';
import ConfirmDialog from '../components/ConfirmDialog';
import pedidoService from '../services/pedidoService';
import catalogService from '../services/catalogService';
import userService from '../services/userService';
import './Pedidos.css';

export default function Pedidos() {
  // Estados principales
  const [pedidos, setPedidos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [verticales, setVerticales] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para modales
  const [showPedidoModal, setShowPedidoModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' o 'edit'
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // Estados para filtros
  const [filters, setFilters] = useState({
    search: '',
    estado: '',
    vertical_id: '',
    provincia_id: '',
    owner_id: ''
  });

  // Estados para alertas
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Cargar todos los datos en paralelo
      const [pedidosData, provinciasData, verticalesData, usuariosData] = await Promise.all([
        pedidoService.getAllPedidos(),
        catalogService.getProvincias(),
        catalogService.getVerticales(),
        userService.getAllUsers()
      ]);
      
      setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
      setProvincias(Array.isArray(provinciasData) ? provinciasData : []);
      setVerticales(Array.isArray(verticalesData) ? verticalesData : []);
      setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error cargando datos:', error);
      showAlert('Error al cargar los datos', 'error');
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 4000);
  };

  const handleCreate = () => {
    setModalMode('create');
    setSelectedPedido(null);
    setShowPedidoModal(true);
  };

  const handleEdit = (pedido) => {
    setModalMode('edit');
    setSelectedPedido(pedido);
    setShowPedidoModal(true);
  };

  const handleSave = async (pedidoData) => {
    try {
      if (modalMode === 'create') {
        await pedidoService.createPedido(pedidoData);
        showAlert('Pedido creado exitosamente', 'success');
      } else {
        await pedidoService.updatePedido(selectedPedido.id, pedidoData);
        showAlert('Pedido actualizado exitosamente', 'success');
      }
      
      setShowPedidoModal(false);
      loadData();
    } catch (error) {
      console.error('Error guardando pedido:', error);
      showAlert(error.message || 'Error al guardar el pedido', 'error');
    }
  };

  const handleDelete = (pedido) => {
    setConfirmAction({
      type: 'danger',
      pedido,
      title: 'Eliminar Pedido',
      message: `¿Estás seguro de que deseas eliminar el pedido de "${pedido.cliente}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      onConfirm: async () => {
        try {
          await pedidoService.deletePedido(pedido.id);
          showAlert('Pedido eliminado correctamente', 'success');
          loadData();
        } catch (error) {
          console.error('Error eliminando pedido:', error);
          showAlert(error.message || 'Error al eliminar el pedido', 'error');
        }
        setShowConfirmDialog(false);
      }
    });
    setShowConfirmDialog(true);
  };

  const handleExportExcel = () => {
    try {
      const filteredData = getFilteredPedidos();
      
      if (filteredData.length === 0) {
        showAlert('No hay datos para exportar', 'error');
        return;
      }
      
      pedidoService.exportToCSV(filteredData);
      showAlert('Datos exportados correctamente', 'success');
    } catch (error) {
      console.error('Error exportando:', error);
      showAlert('Error al exportar los datos', 'error');
    }
  };

  const getFilteredPedidos = () => {
    return pedidos.filter(pedido => {
      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchCliente = pedido.cliente?.toLowerCase().includes(searchLower);
        const matchNif = pedido.nif?.toLowerCase().includes(searchLower);
        if (!matchCliente && !matchNif) return false;
      }
      
      // Filtro de estado
      if (filters.estado && pedido.estado !== filters.estado) {
        return false;
      }
      
      // Filtro de vertical
      if (filters.vertical_id && pedido.vertical_id != filters.vertical_id) {
        return false;
      }
      
      // Filtro de provincia
      if (filters.provincia_id && pedido.provincia_id != filters.provincia_id) {
        return false;
      }
      
      // Filtro de owner
      if (filters.owner_id && pedido.owner_id != filters.owner_id) {
        return false;
      }
      
      return true;
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      estado: '',
      vertical_id: '',
      provincia_id: '',
      owner_id: ''
    });
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'Presentada': return 'badge-presentada';
      case 'Denegada': return 'badge-denegada';
      case 'Evolucionada': return 'badge-evolucionada';
      case 'Ganada': return 'badge-ganada';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="pedidos-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  const filteredPedidos = getFilteredPedidos();

  return (
    <div className="pedidos-container">
      <SideMenu />
      
      {/* Alert Messages */}
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Header */}
      <div className="pedidos-header">
        <div className="header-title">
          <h1>Gestión de Pedidos</h1>
          <span className="pedidos-count">{filteredPedidos.length} pedidos</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-export" onClick={handleExportExcel}>
            <FaFileExcel /> Exportar Excel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            <FaPlus /> Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="pedidos-filters">
        <div className="filter-group">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por cliente, NIF..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        <div className="filter-group">
          <select
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          >
            <option value="">Todos los estados</option>
            <option value="Presentada">Presentada</option>
            <option value="Denegada">Denegada</option>
            <option value="Evolucionada">Evolucionada</option>
            <option value="Ganada">Ganada</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.vertical_id}
            onChange={(e) => setFilters({ ...filters, vertical_id: e.target.value })}
          >
            <option value="">Todas las líneas de negocio</option>
            {verticales.map(v => (
              <option key={v.id} value={v.id}>{v.nombre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.provincia_id}
            onChange={(e) => setFilters({ ...filters, provincia_id: e.target.value })}
          >
            <option value="">Todas las provincias</option>
            {provincias.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.owner_id}
            onChange={(e) => setFilters({ ...filters, owner_id: e.target.value })}
          >
            <option value="">Todos los usuarios</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-clear" onClick={clearFilters}>
          Limpiar
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Cliente</th>
              <th>NIF</th>
              <th>Owner</th>
              <th>Provincia</th>
              <th>Línea de Negocio</th>
              <th>Fecha Creación</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.length === 0 ? (
              <tr>
                <td colSpan="10" className="no-data">
                  No hay pedidos disponibles
                </td>
              </tr>
            ) : (
              filteredPedidos.map(pedido => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>
                    <span className={`estado-badge ${getEstadoBadgeClass(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="cliente-cell">{pedido.cliente}</td>
                  <td>{pedido.nif || '-'}</td>
                  <td>{pedido.owner_nombre || '-'}</td>
                  <td>{pedido.provincia_nombre || '-'}</td>
                  <td>{pedido.vertical_nombre || '-'}</td>
                  <td className="date-cell">
                    {new Date(pedido.fecha_creacion).toLocaleDateString('es-ES')}
                  </td>
                  <td className="observaciones-cell">
                    {pedido.observaciones ? (
                      <span title={pedido.observaciones}>
                        {pedido.observaciones.substring(0, 50)}
                        {pedido.observaciones.length > 50 ? '...' : ''}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => handleEdit(pedido)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(pedido)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showPedidoModal && (
        <PedidoModal
          isOpen={showPedidoModal}
          onClose={() => setShowPedidoModal(false)}
          onSave={handleSave}
          pedido={selectedPedido}
          mode={modalMode}
          provincias={provincias}
          verticales={verticales}
          usuarios={usuarios}
        />
      )}

      {showConfirmDialog && confirmAction && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={confirmAction.onConfirm}
          title={confirmAction.title}
          message={confirmAction.message}
          confirmText={confirmAction.confirmText}
          type={confirmAction.type}
        />
      )}
    </div>
  );
}
