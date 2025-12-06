import React, { useState, useEffect } from 'react';
import './PedidoModal.css';

export default function PedidoModal({ 
  isOpen, 
  onClose, 
  onSave, 
  pedido, 
  mode, 
  provincias, 
  verticales, 
  usuarios 
}) {
  const [formData, setFormData] = useState({
    cliente: '',
    nif: '',
    owner_id: '',
    provincia_id: '',
    vertical_id: '',
    estado: 'Presentada',
    observaciones: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (pedido && mode === 'edit') {
      setFormData({
        cliente: pedido.cliente || '',
        nif: pedido.nif || '',
        owner_id: pedido.owner_id || '',
        provincia_id: pedido.provincia_id || '',
        vertical_id: pedido.vertical_id || '',
        estado: pedido.estado || 'Presentada',
        observaciones: pedido.observaciones || ''
      });
    } else {
      setFormData({
        cliente: '',
        nif: '',
        owner_id: '',
        provincia_id: '',
        vertical_id: '',
        estado: 'Presentada',
        observaciones: ''
      });
    }
  }, [pedido, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = 'El cliente es obligatorio';
    }

    if (!formData.owner_id) {
      newErrors.owner_id = 'Debe seleccionar un responsable';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content pedido-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === 'create' ? 'Crear Nuevo Pedido' : 'Editar Pedido'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cliente">
                  Cliente <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="cliente"
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  className={errors.cliente ? 'error' : ''}
                  placeholder="Nombre del cliente"
                />
                {errors.cliente && <span className="error-message">{errors.cliente}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nif">NIF/CIF</label>
                <input
                  type="text"
                  id="nif"
                  name="nif"
                  value={formData.nif}
                  onChange={handleChange}
                  placeholder="Ej: A12345678"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="owner_id">
                  Responsable <span className="required">*</span>
                </label>
                <select
                  id="owner_id"
                  name="owner_id"
                  value={formData.owner_id}
                  onChange={handleChange}
                  className={errors.owner_id ? 'error' : ''}
                >
                  <option value="">Seleccionar responsable</option>
                  {usuarios.map(u => (
                    <option key={u.id} value={u.id}>{u.name || u.nombre}</option>
                  ))}
                </select>
                {errors.owner_id && <span className="error-message">{errors.owner_id}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="Presentada">Presentada</option>
                  <option value="Denegada">Denegada</option>
                  <option value="Evolucionada">Evolucionada</option>
                  <option value="Ganada">Ganada</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="provincia_id">Provincia</label>
                <select
                  id="provincia_id"
                  name="provincia_id"
                  value={formData.provincia_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar provincia</option>
                  {provincias.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vertical_id">Línea de Negocio</label>
                <select
                  id="vertical_id"
                  name="vertical_id"
                  value={formData.vertical_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar línea de negocio</option>
                  {verticales.map(v => (
                    <option key={v.id} value={v.id}>{v.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                rows="4"
                placeholder="Notas adicionales sobre el pedido..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === 'create' ? 'Crear' : 'Actualizar'} Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
