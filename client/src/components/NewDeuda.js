import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NewDeuda({ datos, setDatos, datoEditable, setDatoEditable, fetchData }) {
  const [idDeuda, setIdDeuda] = useState(null);
  const [concepto, setConcepto] = useState("");
  const [saldoActual, setSaldoActual] = useState("");
  const [limiteSaldo, setLimiteSaldo] = useState("");
  const [interes, setInteres] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const navigate = useNavigate();

  useState(() => {
    if (datoEditable) {
      setIdDeuda(datoEditable.idDeuda);
      setConcepto(datoEditable.concepto);
      setSaldoActual(datoEditable.saldoActual);
      setLimiteSaldo(datoEditable.limiteSaldo);
      setInteres(datoEditable.interes);
      setFechaPago(datoEditable.fechaPago);
      return;
    }
    setIdDeuda(null);
    setConcepto("");
    setSaldoActual("");
    setLimiteSaldo("");
    setInteres("");
    setFechaPago("");
  }, [datoEditable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datoEditable) {
      await Axios.put("http://localhost:3001/updateDeuda", { idDeuda, concepto, saldoActual, limiteSaldo, interes, fechaPago });
      
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La Deuda se actualizó exitosamente",
        showConfirmButton: false,
        timer: 3000
      });
      
      fetchData();
      navigate('/');
      return;
    }
    await Axios.post("http://localhost:3001/createDeuda", { concepto, saldoActual, limiteSaldo, interes, fechaPago });
      
    await Swal.fire({
      position: "top-center",
      icon: "success",
      title: "La Deuda se registró exitosamente",
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
        Gestión de Deudas
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
              aria-label="Concepto"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Saldo Actual:</span>
            <input type="number"
              onChange={(event) => setSaldoActual(event.target.value)}
              className="form-control"
              value={saldoActual}
              placeholder="Ingrese el Saldo Actual"
              aria-label="SaldoActual"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Límite de Saldo:</span>
            <input type="number"
              onChange={(event) => setLimiteSaldo(event.target.value)}
              className="form-control"
              value={limiteSaldo}
              placeholder="Ingrese el Límite de Saldo"
              aria-label="LimiteSaldo"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Interés (%):</span>
            <input type="number"
              onChange={(event) => setInteres(event.target.value)}
              className="form-control"
              value={interes}
              placeholder="Ingrese el Interés"
              aria-label="Interes"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de Pago:</span>
            <input type="date"
              onChange={(event) => setFechaPago(event.target.value)}
              className="form-control"
              value={fechaPago}
              aria-label="FechaPago"
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

export default NewDeuda;
