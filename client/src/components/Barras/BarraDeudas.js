import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraDeudas = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [deudasList, setDeudasList] = useState([]);
  
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalDeudas, setTotalDeudas] = useState(0);
  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, deudasResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/deudas')
      ]);

      const ingresosData = ingresosResponse.data;
      const deudasData = deudasResponse.data;

      setIngresosList(ingresosData);
      setDeudasList(deudasData);


      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalDeudas(deudasData.reduce((acc, deuda) => acc + deuda.saldoActual, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, deudasList]);

  // Funciones para calcular los porcentajes
  const calcularPorcentaje = () => {
    if (totalIngresos === 0) return 0;
    return (totalDeudas / totalIngresos) * 100;
  };

  const getBarColor = () => {
    const porcentaje = calcularPorcentaje();
    if (porcentaje <= 10) return 'bg-success';  // Verde (0-10%)
    if (porcentaje <= 14) return 'bg-warning';  // Amarillo (11-14%)
    return 'bg-danger';  // Rojo (15% o más)
  };

  return (
    <div className="container">
      {/* Barra de progreso de deudas */}
      <br/>
      <div className="container mb-3">
      <h4>Total de Deudas: ${totalDeudas}</h4>
        <p>Porcentaje de deudas sobre ingresos: {calcularPorcentaje().toFixed(2)}%</p>
        <div className="progress">
          <div
            className={`progress-bar ${getBarColor()}`}
            role="progressbar"
            style={{ width: `${calcularPorcentaje()}%` }}
            aria-valuenow={calcularPorcentaje()}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalDeudas}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraDeudas;
