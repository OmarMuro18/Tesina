import React, {useState} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Tarjetas = ({ tarjetasList, setTarjetas, setDatoEditable, fetchData }) => {
  const navigate = useNavigate();
  const [pagadas, setPagadas] = useState({});

  // Funciones de Tarjetas
  const newTarjetaForm = () => {
    setDatoEditable(null);
    navigate('/NewTarjeta');
  };

  const editTarjetaForm = (tarjeta) => {
    setDatoEditable(tarjeta);
    navigate('/NewTarjeta');
  };

  const deleteTarjeta = async (idTarjeta) => {
    const result = await Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Una vez eliminada, no se podrá recuperar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      await Axios.delete(`http://localhost:3001/deleteTarjeta/${idTarjeta}`);
      await Swal.fire({
        title: 'Eliminada',
        text: 'La tarjeta ha sido eliminada',
        icon: 'success',
        timer: 3000,
      });

      await fetchData();
      navigate('/');
    }
  };

  const pagarDeuda = async (idTarjeta, saldoActual, limiteCredito, tasaInteres) => {
    const nLSSInteres = limiteCredito - saldoActual;
    const interesDecimal = tasaInteres / 100; 
    const interesAplicado = nLSSInteres * interesDecimal;
    const nuevoLimiteSaldo = nLSSInteres + interesAplicado;
  
    if (isNaN(nuevoLimiteSaldo)) {
      Swal.fire({
        title: 'Error',
        text: 'Los valores de la tarjeta no son válidos.',
        icon: 'error',
        timer: 3000,
      });
      return;
    }
  
    try {
      const response = await Axios.put(`http://localhost:3001/updateTarjeta/${idTarjeta}`, {
        nuevoLimiteSaldo
      });
  
      Swal.fire({
        title: 'Éxito',
        text: response.data.message,
        icon: 'success',
        timer: 3000,
      });
  
      fetchData();
    } catch (error) {
      console.error('Error al pagar la tarjeta:', error);
      Swal.fire({
        title: 'Exito',
        text: 'Sea actualizado de manera correcta la tarjeta',
        icon: 'success',
        timer: 3000,
      });
    }
  };

  const marcarComoPagado = (idTarjeta) => {
    setPagadas((prev) => ({ ...prev, [idTarjeta]: true }));
  };

  const getRowClass = (interes) => {
    if (interes <= 2.4) return 'low-interest';  // Verde
    if (interes >= 2.5 && interes <= 4.9) return 'medium-interest';  // Amarillo
    return 'high-interest';  // Rojo
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Tarjetas de Crédito</h1>
      <table className='table-custom'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Entidad Bancaria</th>
            
            <th scope='col'>Aportación</th>
            <th scope='col'>Adeudo</th>
            <th scope='col'>Tasa de Interés</th>
            <th scope='col'>Fecha de Corte</th>
            <th scope='col'>Fecha de Pago</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarjetasList.map((tarjeta, key) => (
            <tr key={tarjeta.idDeuda} className={getRowClass(tarjeta.tasaInteres)}>
              <th>{tarjeta.idTarjeta}</th>
              <td>{tarjeta.entidadBancaria}</td>
             
              <td>{tarjeta.saldoActual}</td>
              <td>{tarjeta.limiteCredito}</td>
              <td>{tarjeta.tasaInteres}</td>
              <td>{new Date(tarjeta.fechaCorte).toISOString().split('T')[0]}</td>
              <td>{new Date(tarjeta.fechaPago).toISOString().split('T')[0]}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editTarjetaForm(tarjeta)}
                    className="btn btn-info"
                    disabled={pagadas[tarjeta.idTarjeta]}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTarjeta(tarjeta.idTarjeta)}
                    className="btn btn-danger"
                    disabled={pagadas[tarjeta.idTarjeta]}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      marcarComoPagado(tarjeta.idTarjeta);
                      pagarDeuda(tarjeta.idTarjeta, tarjeta.saldoActual, tarjeta.limiteCredito, tarjeta.tasaInteres);
                    }}
                    className="btn btn-success"
                    disabled={pagadas[tarjeta.idTarjeta]} // Desactivar si está pagada
                  >
                    Pagar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={newTarjetaForm}>
        Agregar nueva tarjeta
      </button>
    </div>
  );
};

export default Tarjetas;
