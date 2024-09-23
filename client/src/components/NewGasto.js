import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NewGasto({ datos, setDatos, datoEditable, setDatoEditable }) {
  const [idGasto, setIdGastos] = useState(null);
  const [concepto, setConcepto] = useState("");
  const [adeudo, setAdeudo] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [tipo, setTipo] = useState("");
  const navigate = useNavigate();

  useState(() => {
  if (datoEditable) {
    setIdGastos(datoEditable.idGasto);
    setConcepto(datoEditable.concepto);
    setAdeudo(datoEditable.adeudo);
    setPrioridad(datoEditable.prioridad);
    setTipo(datoEditable.tipo);
    return;

    }
    setIdGastos(null);;
    setConcepto("");;
    setAdeudo("");;
    setPrioridad("");;
    setTipo("");
  }, [datoEditable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datoEditable) {
      await Axios.put("http://localhost:3001/updateGas", { idGasto, concepto, adeudo, prioridad, tipo });
      
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "El Gasto se actualizó exitosamente",
        showConfirmButton: false,
        timer: 3000
      });
      
      navigate('/');
      return;
    }
    await Axios.post("http://localhost:3001/createGas", { concepto, adeudo, prioridad, tipo });
      
    await Swal.fire({
      position: "top-center",
      icon: "success",
      title: "El Gasto se registró exitosamente",
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
        Gestión de Gastos
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
            <span className="input-group-text" id="basic-addon1">Adeudo:</span>
            <input type="number"
              onChange={(event) => setAdeudo(event.target.value)}
              className="form-control"
              value={adeudo}
              placeholder="Ingrese la Adeudo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Prioridad:</span>
            <select 
                onChange={(event) => setPrioridad(event.target.value)}
                className="form-control"
                value={prioridad}
                aria-label="Prioridad"
                aria-describedby="basic-addon2"
            >
                <option value="">Seleccione la Prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>
            </div>

            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">Tipo:</span>
            <select 
                onChange={(event) => setTipo(event.target.value)}
                className="form-control"
                value={tipo}
                aria-label="Tipo"
                aria-describedby="basic-addon3"
            >
                <option value="">Seleccione el Tipo</option>
                <option value="Necesidad Básica">Necesidad Básica</option>
                <option value="Personal">Personal</option>
            </select>
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

export default NewGasto;
