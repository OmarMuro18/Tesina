import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Tarjetas = ({ tarjetasList, setTarjetas, setDatoEditable, fetchData }) => {
  const navigate = useNavigate();

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

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Tarjetas de Crédito</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Entidad Bancaria</th>
            <th scope='col'>Número de Tarjeta</th>
            <th scope='col'>Límite de Crédito</th>
            <th scope='col'>Saldo Actual</th>
            <th scope='col'>Tasa de Interés</th>
            <th scope='col'>Fecha de Corte</th>
            <th scope='col'>Fecha de Pago</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tarjetasList.map((tarjeta, key) => (
            <tr key={tarjeta.idTarjeta}>
              <th>{tarjeta.idTarjeta}</th>
              <td>{tarjeta.entidadBancaria}</td>
              <td>{tarjeta.numeroTarjeta}</td>
              <td>{tarjeta.limiteCredito}</td>
              <td>{tarjeta.saldoActual}</td>
              <td>{tarjeta.tasaInteres}</td>
              <td>{new Date(tarjeta.fechaCorte).toISOString().split('T')[0]}</td>
              <td>{new Date(tarjeta.fechaPago).toISOString().split('T')[0]}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editTarjetaForm(tarjeta)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTarjeta(tarjeta.idTarjeta)}
                    className="btn btn-danger"
                  >
                    Eliminar
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
