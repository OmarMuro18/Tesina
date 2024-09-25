import React, { useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Gastos = ({ gastosList, setGastos, setDatoEditable }) => {
  const navigate = useNavigate();

  // Funciones de Gastos
  const newGastoForm = () => {
    setDatoEditable(null);
    navigate('/NewGasto');
  };

  const editGastoForm = (gas) => {
    setDatoEditable(gas);
    navigate('/NewGasto');
  };

  const deletGasto = async (idGasto) => {
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
      await Axios.delete(`http://localhost:3001/deleteGas/${idGasto}`);
      await Swal.fire({
        title: 'Eliminado',
        text: 'El registro ha sido eliminado',
        icon: 'success',
        timer: 3000,
      });
    }
  };


  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Gastos</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Concepto</th>
            <th scope='col'>Adeudo</th>
            <th scope='col'>Prioridad</th>
            <th scope='col'>Tipo</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gastosList.map((gas, key) => (
            <tr key={gas.idGasto}>
              <th>{gas.idGasto}</th>
              <td>{gas.concepto}</td>
              <td>{gas.adeudo}</td>
              <td>{gas.prioridad}</td>
              <td>{gas.tipo}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editGastoForm(gas)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletGasto(gas.idGasto)}
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
      <button className="btn btn-success" onClick={newGastoForm}>
        Agregar nuevo gasto
      </button>
    </div>
  );
};

export default Gastos;
