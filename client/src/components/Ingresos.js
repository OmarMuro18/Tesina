import React from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Ingresos = ({ ingresosList, setIngresos, setDatoEditable }) => {
  const navigate = useNavigate();

  const newIngresoForm = () => {
    setDatoEditable(null);
    navigate('/NewIngreso');
  };

  const editIngresoForm = (ing) => {
    setDatoEditable(ing);
    navigate('/NewIngreso');
  };

  const deletIngreso = async (idIngreso) => {
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
      await Axios.delete(`http://localhost:3001/delete/${idIngreso}`);
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
      <h1 style={{ textAlign: 'center', margin: 5 }}>Ingresos</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Concepto</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresosList.map((ing, key) => (
            <tr key={ing.idIngreso}>
              <th>{ing.idIngreso}</th>
              <td>{ing.concepto}</td>
              <td>{ing.cantidad}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editIngresoForm(ing)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletIngreso(ing.idIngreso)}
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
      <button className="btn btn-success" onClick={newIngresoForm}>
        Agregar nuevo ingreso
      </button>
    </div>
  );
};

export default Ingresos;
