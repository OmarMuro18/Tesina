import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraGastos = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [gastosList, setGastosList] = useState([]);
  
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);

  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, gastosResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/gastos')
      ]);

      const ingresosData = ingresosResponse.data;
      const gastosData = gastosResponse.data;

      setIngresosList(ingresosData);
      setGastosList(gastosData);

      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalGastos(gastosData.reduce((acc, gasto) => acc + gasto.adeudo, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, gastosList]);

  // Funciones para calcular los porcentajes
  const calcularPorcentaje = (total) => {
    if (totalIngresos === 0) return 0;
    return (total / totalIngresos) * 100;
  };

  const porcentajeGastos = calcularPorcentaje(totalGastos);

  // Determinar el color de la barra
  let barraColor = 'bg-success'; // Verde claro por defecto
  if (porcentajeGastos >= 46 && porcentajeGastos <= 49) {
    barraColor = 'bg-warning'; // Amarillo
  } else if (porcentajeGastos >= 50) {
    barraColor = 'bg-danger'; // Rojo
  }

  return (
    <div className="container">
      {/* Barra de progreso de gastos */}
      <br/>
      <div className="container mb-3">
      <h4>Total de Gastos: ${totalGastos}{' '}</h4>
        <p>Porcentaje de gastos sobre ingresos: {porcentajeGastos.toFixed(2)}%</p>
        <div className="progress">
          <div
            className={`progress-bar ${barraColor}`}
            role="progressbar"
            style={{ width: `${porcentajeGastos}%` }}
            aria-valuenow={porcentajeGastos}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalGastos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraGastos;
