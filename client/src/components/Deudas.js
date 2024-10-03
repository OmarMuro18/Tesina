import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Deudas = ({ deudasList, setDeudas, setDatoEditable, fetchData }) => {
  const navigate = useNavigate();

  // Funciones de Deudas
  const newDeudaForm = () => {
    setDatoEditable(null);
    navigate('/NewDeuda');
  };

  const editDeudaForm = (deuda) => {
    setDatoEditable(deuda);
    navigate('/NewDeuda');
  };

  const deleteDeuda = async (idDeuda) => {
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
      await Axios.delete(`http://localhost:3001/deleteDeuda/${idDeuda}`);
      await Swal.fire({
        title: 'Eliminada',
        text: 'La deuda ha sido eliminada',
        icon: 'success',
        timer: 3000,
      });

      await fetchData();
      navigate('/');
    }
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Deudas</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Concepto</th>
            <th scope='col'>Saldo Actual</th>
            <th scope='col'>Límite de Saldo</th>
            <th scope='col'>Interés</th>
            <th scope='col'>Fecha de Pago</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deudasList.map((deuda, key) => (
            <tr key={deuda.idDeuda}>
              <th>{deuda.idDeuda}</th>
              <td>{deuda.concepto}</td>
              <td>{deuda.saldoActual}</td>
              <td>{deuda.limiteSaldo}</td>
              <td>{deuda.interes}</td>
              <td>{deuda.fechaPago}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editDeudaForm(deuda)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDeuda(deuda.idDeuda)}
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
      <button className="btn btn-success" onClick={newDeudaForm}>
        Agregar nueva deuda
      </button>
    </div>
  );
};

export default Deudas;
