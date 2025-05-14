import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraTC = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [tarjetasList, setTarjetasList] = useState([]);
  
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalTarjetas, setTotalTarjetas] = useState(0);

  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, tarjetasResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/tarjetas')
      ]);

      const ingresosData = ingresosResponse.data;
      const tarjetasData = tarjetasResponse.data;

      setIngresosList(ingresosData);
      setTarjetasList(tarjetasData);

      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalTarjetas(tarjetasData.reduce((acc, tarjeta) => acc + tarjeta.saldoActual, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, tarjetasList]);

  // Funciones para calcular los porcentajes
  const calcularPorcentaje = () => {
    if (totalIngresos === 0) return 0;
    return (totalTarjetas / totalIngresos) * 100;
  };

  // Obtener color de la barra basado en el porcentaje
  const getBarColor = () => {
    const porcentaje = calcularPorcentaje();
    if (porcentaje <= 10) return 'bg-success';  // Verde (0-10%)
    if (porcentaje <= 14) return 'bg-warning';  // Amarillo (11-14%)
    return 'bg-danger';  // Rojo (15% o más)
  };

  return (
    <div className="container">
      {/* Barra de progreso de tarjetas de crédito */}
      <div className="container mb-3">
        <br/>
        <h4>Total de Saldo en Tarjetas: ${totalTarjetas}</h4>
        <p>Porcentaje de saldo en tarjetas sobre ingresos: {calcularPorcentaje().toFixed(2)}%</p>
        <div className="progress">
          <div
            className={`progress-bar ${getBarColor()}`}
            role="progressbar"
            style={{ width: `${calcularPorcentaje()}%` }}
            aria-valuenow={calcularPorcentaje()}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            ${totalTarjetas}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarraTC;
