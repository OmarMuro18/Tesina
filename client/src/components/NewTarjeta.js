import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function NewTarjeta({ datos, setDatos, datoEditable, setDatoEditable, fetchData }) {
  const [idTarjeta, setIdTarjeta] = useState(null);
  const [entidadBancaria, setEntidadBancaria] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [limiteCredito, setLimiteCredito] = useState("");
  const [saldoActual, setSaldoActual] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [fechaCorte, setFechaCorte] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const navigate = useNavigate();

  useState(() => {
    if (datoEditable) {
      setIdTarjeta(datoEditable.idTarjeta);
      setEntidadBancaria(datoEditable.entidadBancaria);
      setNumeroTarjeta(datoEditable.numeroTarjeta);
      setLimiteCredito(datoEditable.limiteCredito);
      setSaldoActual(datoEditable.saldoActual);
      setTasaInteres(datoEditable.tasaInteres);
      setFechaCorte(datoEditable.fechaCorte);
      setFechaPago(datoEditable.fechaPago);
      return;
    }
    setIdTarjeta(null);
    setEntidadBancaria("");
    setNumeroTarjeta("");
    setLimiteCredito("");
    setSaldoActual("");
    setTasaInteres("");
    setFechaCorte("");
    setFechaPago("");
  }, [datoEditable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (datoEditable) {
      await Axios.put("http://localhost:3001/updateTarjeta", { idTarjeta, entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago });
      
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La Tarjeta se actualizó exitosamente",
        showConfirmButton: false,
        timer: 3000
      });
      
      fetchData();
      navigate('/');
      return;
    }
    await Axios.post("http://localhost:3001/createTarjeta", { entidadBancaria, numeroTarjeta, limiteCredito, saldoActual, tasaInteres, fechaCorte, fechaPago });
      
    await Swal.fire({
      position: "top-center",
      icon: "success",
      title: "La Tarjeta se registró exitosamente",
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
        Gestión de Tarjetas de Crédito
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Entidad Bancaria:</span>
            <input type="text"
              onChange={(event) => setEntidadBancaria(event.target.value)}
              className="form-control"
              value={entidadBancaria}
              placeholder="Ingrese la Entidad Bancaria"
              aria-label="EntidadBancaria"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Número de Tarjeta:</span>
            <input type="text"
              onChange={(event) => setNumeroTarjeta(event.target.value)}
              className="form-control"
              value={numeroTarjeta}
              placeholder="Ingrese los últimos 4 dígitos"
              aria-label="NumeroTarjeta"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Límite de Crédito:</span>
            <input type="number"
              onChange={(event) => setLimiteCredito(event.target.value)}
              className="form-control"
              value={limiteCredito}
              placeholder="Ingrese el Límite de Crédito"
              aria-label="LimiteCredito"
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
            <span className="input-group-text" id="basic-addon1">Tasa de Interés (%):</span>
            <input type="number"
              onChange={(event) => setTasaInteres(event.target.value)}
              className="form-control"
              value={tasaInteres}
              placeholder="Ingrese la Tasa de Interés"
              aria-label="TasaInteres"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de Corte:</span>
            <input type="date"
              onChange={(event) => setFechaCorte(event.target.value)}
              className="form-control"
              value={fechaCorte}
              aria-label="FechaCorte"
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
          <button type="submit" className="btn btn-success">Guardar</button>
          <button type="button" onClick={handleCancel} className="btn btn-danger">Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default NewTarjeta;
