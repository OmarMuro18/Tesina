import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NewAhorro({ datos, setDatos, datoEditable, setDatoEditable, fetchData }) {
  const [idAhorro, setIdAhorro] = useState(null);
  const [concepto, setConcepto] = useState("");
  const [totalRequerido, setTotalRequerido] = useState("");
  const [totalAbonado, setTotalAbonado] = useState("");
  const navigate = useNavigate();

  useState(() => {
    if (datoEditable) {
      setIdAhorro(datoEditable.idAhorro);
      setConcepto(datoEditable.concepto);
      setTotalRequerido(datoEditable.totalRequerido);
      setTotalAbonado(datoEditable.totalAbonado);
      return;
    }
    setIdAhorro(null);
    setConcepto("");
    setTotalRequerido("");
    setTotalAbonado("");
  }, [datoEditable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datoEditable) {
      await Axios.put("http://localhost:3001/updateAhorro", { idAhorro, concepto, totalRequerido, totalAbonado });
      
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "El ahorro se actualizó exitosamente",
        showConfirmButton: false,
        timer: 3000
      });
      
      fetchData();
      navigate('/');
      return;
    }
    await Axios.post("http://localhost:3001/createAhorro", { concepto, totalRequerido, totalAbonado });
      
    await Swal.fire({
      position: "top-center",
      icon: "success",
      title: "El ahorro se registró exitosamente",
      showConfirmButton: false,
      timer: 3000
    });
    
    fetchData();
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        Gestión de Ahorros
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Concepto:</span>
            <input
              type="text"
              onChange={(event) => setConcepto(event.target.value)}
              className="form-control"
              value={concepto}
              placeholder="Ingrese el Concepto"
              aria-label="Concepto"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Total Requerido:</span>
            <input
              type="number"
              onChange={(event) => setTotalRequerido(event.target.value)}
              className="form-control"
              value={totalRequerido}
              placeholder="Ingrese el Total Requerido"
              aria-label="TotalRequerido"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Total Abonado:</span>
            <input
              type="number"
              onChange={(event) => setTotalAbonado(event.target.value)}
              className="form-control"
              value={totalAbonado}
              placeholder="Ingrese el Total Abonado"
              aria-label="TotalAbonado"
              aria-describedby="basic-addon1"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger">Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default NewAhorro;
