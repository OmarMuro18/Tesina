import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraProgresoFinanciera = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [gastosList, setGastosList] = useState([]);
  const [deudasList, setDeudasList] = useState([]);
  const [tarjetasList, setTarjetasList] = useState([]);
  const [ahorrosList, setAhorrosList] = useState([]);
  
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalDeudas, setTotalDeudas] = useState(0);
  const [totalTarjetas, setTotalTarjetas] = useState(0);
  const [totalAhorros, setTotalAhorros] = useState(0);

  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, gastosResponse, deudasResponse, tarjetasResponse, ahorrosResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/gastos'),
        Axios.get('http://localhost:3001/deudas'),
        Axios.get('http://localhost:3001/tarjetas'),
        Axios.get('http://localhost:3001/ahorros'),
      ]);

      const ingresosData = ingresosResponse.data;
      const gastosData = gastosResponse.data;
      const deudasData = deudasResponse.data;
      const tarjetasData = tarjetasResponse.data;
      const ahorrosData = ahorrosResponse.data;

      setIngresosList(ingresosData);
      setGastosList(gastosData);
      setDeudasList(deudasData);
      setTarjetasList(tarjetasData);
      setAhorrosList(ahorrosData);

      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalGastos(gastosData.reduce((acc, gasto) => acc + gasto.adeudo, 0));
      setTotalDeudas(deudasData.reduce((acc, deuda) => acc + deuda.saldoActual, 0));
      setTotalTarjetas(tarjetasData.reduce((acc, tarjeta) => acc + tarjeta.saldoActual, 0));
      setTotalAhorros(ahorrosData.reduce((acc, ahorro) => acc + ahorro.totalAbonado, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, gastosList, deudasList, tarjetasList, ahorrosList]);

  // Funciones para calcular los porcentajes
  const calcularPorcentaje = (total) => {
    if (totalIngresos === 0) return 0;
    return (total / totalIngresos) * 100;
  };

  return (
    <div className="container">
      <h1>Resumen Financiero</h1>

      {/* Barra de progreso de ingresos */}
      <div className="container mb-3">
        <h4>Total de Ingresos: ${totalIngresos}</h4>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: '100%' }}
            aria-valuenow={100}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalIngresos}
          </div>
        </div>
      </div>

      {/* Barra de progreso de gastos */}
      <div className="container mb-3">
        <h4>Total de Gastos: ${totalGastos}</h4>
        <p>Porcentaje de gastos sobre ingresos: {calcularPorcentaje(totalGastos).toFixed(2)}%</p>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${calcularPorcentaje(totalGastos)}%` }}
            aria-valuenow={calcularPorcentaje(totalGastos)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalGastos}
          </div>
        </div>
      </div>

      {/* Barra de progreso de deudas */}
      <div className="container mb-3">
        <h4>Total de Deudas: ${totalDeudas}</h4>
        <p>Porcentaje de deudas sobre ingresos: {calcularPorcentaje(totalDeudas).toFixed(2)}%</p>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${calcularPorcentaje(totalDeudas)}%` }}
            aria-valuenow={calcularPorcentaje(totalDeudas)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalDeudas}
          </div>
        </div>
      </div>

      {/* Barra de progreso de tarjetas de crédito */}
      <div className="container mb-3">
        <h4>Total de Saldo en Tarjetas: ${totalTarjetas}</h4>
        <p>Porcentaje de saldo en tarjetas sobre ingresos: {calcularPorcentaje(totalTarjetas).toFixed(2)}%</p>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: `${calcularPorcentaje(totalTarjetas)}%` }}
            aria-valuenow={calcularPorcentaje(totalTarjetas)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalTarjetas}
          </div>
        </div>
      </div>

      {/* Barra de progreso de ahorros */}
      <div className="container mb-3">
        <h4>Total de Ahorros: ${totalAhorros}</h4>
        <p>Porcentaje de ahorros sobre ingresos: {calcularPorcentaje(totalAhorros).toFixed(2)}%</p>
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{ width: `${calcularPorcentaje(totalAhorros)}%` }}
            aria-valuenow={calcularPorcentaje(totalAhorros)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalAhorros}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraProgresoFinanciera;
