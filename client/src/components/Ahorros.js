import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Ahorros = ({ ahorrosList, setAhorros, setDatoEditable, fetchData }) => {
  const navigate = useNavigate();

  // Funciones de Ahorros
  const newAhorroForm = () => {
    setDatoEditable(null);
    navigate('/NewAhorro');
  };

  const editAhorroForm = (ahorro) => {
    setDatoEditable(ahorro);
    navigate('/NewAhorro');
  };

  const deleteAhorro = async (idAhorro) => {
    const result = await Swal.fire({
      title: 'Confirmar eliminación',
      text: 'Una vez eliminado, no se podrá recuperar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (result.isConfirmed) {
      await Axios.delete(`http://localhost:3001/deleteAhorro/${idAhorro}`);
      await Swal.fire({
        title: 'Eliminado',
        text: 'El ahorro ha sido eliminado',
        icon: 'success',
        timer: 3000,
      });

      await fetchData();
      navigate('/');
    }
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Ahorros</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Concepto</th>
            <th scope='col'>Total Requerido</th>
            <th scope='col'>Total Abonado</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ahorrosList.map((ahorro, key) => (
            <tr key={ahorro.idAhorro}>
              <th>{ahorro.idAhorro}</th>
              <td>{ahorro.concepto}</td>
              <td>{ahorro.totalRequerido}</td>
              <td>{ahorro.totalAbonado}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editAhorroForm(ahorro)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAhorro(ahorro.idAhorro)}
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
      <button className="btn btn-success" onClick={newAhorroForm}>
        Agregar nuevo ahorro
      </button>
    </div>
  );
};

export default Ahorros;