import React, {useState} from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Deudas = ({ deudasList, setDeudas, setDatoEditable, fetchData }) => {
  const navigate = useNavigate();
  const [pagadas, setPagadas] = useState({});

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

  const pagarDeuda = async (idDeuda, saldoActual, limiteSaldo, interes) => {
    const nLSSInteres = limiteSaldo - saldoActual;
    const interesDecimal = interes / 100; 
    const interesAplicado = nLSSInteres * interesDecimal;
    const nuevoLimiteSaldo = nLSSInteres + interesAplicado;
  
    if (isNaN(nuevoLimiteSaldo)) {
      Swal.fire({
        title: 'Error',
        text: 'Los valores de la deuda no son válidos.',
        icon: 'error',
        timer: 3000,
      });
      return;
    }
  
    try {
      const response = await Axios.put(`http://localhost:3001/updateDeuda/${idDeuda}`, {
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
      Swal.fire({
        title: 'Exito',
        text: 'Sea actualizado de manera correcta la deuda',
        icon: 'success',
        timer: 3000,
      });
    }
  };

  const marcarComoPagado = (idDeuda) => {
    setPagadas((prev) => ({ ...prev, [idDeuda]: true }));
  };

  const getRowClass = (interes) => {
    if (interes <= 2.4) return 'low-interest';  
    if (interes >= 2.5 && interes <= 4.9) return 'medium-interest'; 
    return 'high-interest';  
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', margin: 5 }}>Deudas</h1>
      <table className='table-custom'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Concepto</th>
            <th scope='col'>Aportación</th>
            <th scope='col'>Adeudo</th>
            <th scope='col'>Interés</th>
            <th scope='col'>Fecha de Pago</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deudasList.map((deuda, key) => (
           <tr key={deuda.idDeuda} className={getRowClass(deuda.interes)}>
              <th>{deuda.idDeuda}</th>
              <td>{deuda.concepto}</td>
              <td>{deuda.saldoActual}</td>
              <td>{deuda.limiteSaldo}</td>
              <td>{deuda.interes}</td>
              <td>{new Date(deuda.fechaPago).toISOString().split('T')[0]}</td>
              <td>
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => editDeudaForm(deuda)}
                    className="btn btn-info"
                    disabled={pagadas[deuda.idDeuda]}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDeuda(deuda.idDeuda)}
                    className="btn btn-danger"
                    disabled={pagadas[deuda.idDeuda]}
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      marcarComoPagado(deuda.idDeuda);
                      pagarDeuda(deuda.idDeuda, deuda.saldoActual, deuda.limiteSaldo, deuda.interes);
                    }}
                    className="btn btn-success"
                    disabled={pagadas[deuda.idDeuda]} // Desactivar si está pagada
                  >
                    Pagar
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
