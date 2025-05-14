import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';

const BarraAhorro = () => {
  const [ingresosList, setIngresosList] = useState([]);
  const [ahorrosList, setAhorrosList] = useState([]);
  
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalAhorros, setTotalAhorros] = useState(0);

  // Función unificada para obtener ingresos, gastos, deudas, tarjetas y ahorros
  const fetchFinanzas = useCallback(async () => {
    try {
      const [ingresosResponse, ahorrosResponse] = await Promise.all([
        Axios.get('http://localhost:3001/ingresos'),
        Axios.get('http://localhost:3001/ahorros'),
      ]);

      const ingresosData = ingresosResponse.data;
      const ahorrosData = ahorrosResponse.data;

      setIngresosList(ingresosData);
      setAhorrosList(ahorrosData);

      // Calcular los totales
      setTotalIngresos(ingresosData.reduce((acc, ingreso) => acc + ingreso.cantidad, 0));
      setTotalAhorros(ahorrosData.reduce((acc, ahorro) => acc + ahorro.totalAbonado, 0));

    } catch (error) {
      console.error('Error al obtener las finanzas:', error);
    }
  }, []);

  useEffect(() => {
    fetchFinanzas();
  }, [ingresosList, ahorrosList]);

  const porcentajeAhorro = totalIngresos === 0 ? 0 : (totalAhorros / totalIngresos) * 100;

  // Determinar color de la barra
  const getBarColor = () => {
    if (porcentajeAhorro <= 15) return 'bg-danger';   // Rojo (0-15%)
    if (porcentajeAhorro <= 19) return 'bg-warning';  // Amarillo (16-19%)
    return 'bg-success';  // Verde (20% o más)
  };

  return (
    <div className="container">
        {/* Barra de progreso de ahorros */}
        <div className="container mb-3">
            <br/>
            <h4>Total destinado Ahorros: ${totalAhorros}</h4>
            <p>Porcentaje de ahorros sobre ingresos: {porcentajeAhorro.toFixed(2)}%</p>
            <div className="progress">
              <div
                className={`progress-bar ${getBarColor()}`}
                role="progressbar"
                style={{ width: `${porcentajeAhorro}%` }}
                aria-valuenow={porcentajeAhorro}
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

export default BarraAhorro;
