import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraIngresos = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [deudasList, setDeudasList] = useState([]);
  const [tarjetasList, setTarjetasList] = useState([]);
  const [gastosList, setGastosList] = useState([]);
  const [ahorrosList, setAhorrosList] = useState([]);

  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalDeudas, setTotalDeudas] = useState(0);
  const [totalTarjetas, setTotalTarjetas] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalAhorros, setTotalAhorros] = useState(0);
  const [ingresosDisponibles, setIngresosDisponibles] = useState(0);
  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, deudasResponse, tarjetasResponse, gastosResponse, ahorrosResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/deudas'),
        Axios.get('http://localhost:3001/tarjetas'),
        Axios.get('http://localhost:3001/gastos'),
        Axios.get('http://localhost:3001/ahorros')
      ]);

      const ingresosData = ingresosResponse.data;
      const deudasData = deudasResponse.data;
      const tarjetasData = tarjetasResponse.data;
      const gastosData = gastosResponse.data;
      const ahorrosData = ahorrosResponse.data;

      setIngresosList(ingresosData);
      setDeudasList(deudasData);
      setTarjetasList(tarjetasData);
      setGastosList(gastosData);
      setAhorrosList(ahorrosData);


      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalDeudas(deudasData.reduce((acc, deuda) => acc + deuda.saldoActual, 0));
      setTotalTarjetas(tarjetasData.reduce((acc, tarjeta) => acc + tarjeta.saldoActual, 0));
      setTotalGastos(gastosData.reduce((acc, gasto) => acc + gasto.adeudo, 0));
      setTotalAhorros(ahorrosData.reduce((acc, ahorro) => acc + ahorro.totalAbonado, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    setIngresosDisponibles(totalIngresos - (totalDeudas + totalTarjetas + totalGastos + totalAhorros));
  }, [totalIngresos, totalDeudas, totalTarjetas, totalGastos, totalAhorros]);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, deudasList, tarjetasList, gastosList, ahorrosList]);

  // Funciones para calcular los porcentajes
  const calcularPorcentaje = () => {
    if (totalIngresos === 0) return 0;
    return (ingresosDisponibles / totalIngresos) * 100;
  };

  return(
    <div className="container">
      <h1>Resumen Financiero</h1>
      {/* Barra de progreso de ingresos */}
      <div className="container mb-3">
        <h4>Total de Ingresos Disponibles: ${ingresosDisponibles}</h4>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${calcularPorcentaje()}%` }}
            aria-valuenow={calcularPorcentaje()}
            aria-valuemin="0"
            aria-valuemax="100"
            >
            ${ingresosDisponibles} / ${totalIngresos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraIngresos;
