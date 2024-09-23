import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NewIngreso({ datos, setDatos, datoEditable, setDatoEditable }) {
  const [idIngreso, setIdIngresos] = useState(null);
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigate = useNavigate();

  useState (() => {
  if (datoEditable) {
      
    setIdIngresos(datoEditable.idIngreso);
    setConcepto(datoEditable.concepto);
    setCantidad(datoEditable.cantidad);
    return;

  }
  setIdIngresos(null);
  setConcepto("");
  setCantidad("");

  }, [datoEditable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datoEditable) {
      await Axios.put("http://localhost:3001/update", {idIngreso, concepto, cantidad });
      
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "El ingreso se actualizó exitosamente",
        showConfirmButton: false,
        timer: 3000
      });
      
      navigate('/');
      return;
    }
    await Axios.post("http://localhost:3001/create", { concepto, cantidad })
    
    await Swal.fire({
      position: "top-center",
      icon: "success",
      title: "El ingreso se registró exitosamente",
      showConfirmButton: false,
      timer: 3000
    });
    
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        Gestión de Ingresos
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Concepto:</span>
            <input type="text"
              onChange={(event) => setConcepto(event.target.value)}
              className="form-control"
              value={concepto}
              placeholder="Ingrese el Concepto"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cantidad:</span>
            <input type="number"
              onChange={(event) => setCantidad(event.target.value)}
              className="form-control"
              value={cantidad}
              placeholder="Ingrese la Cantidad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {datoEditable ? "Actualizar" : "Registrar"}
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-danger">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIngreso;
