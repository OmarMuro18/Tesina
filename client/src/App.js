import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Ingresos from './components/Ingresos';
import Gastos from './components/Gastos';
import NewIngreso from './components/NewIngreso'; 
import NewGasto from './components/NewGasto';     
import Axios from 'axios';

function App () {
  const [datos, setDatos] = useState([]);
  const [ingresosList, setIngresos] = useState([]);
  const [gastosList, setGastos] = useState([]);
  const [datoEditable, setDatoEditable] = useState([]);
  //const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const ingresosResponse = await Axios.get('http://localhost:3001/ingresos');
      setIngresos(ingresosResponse.data);

      const gastosResponse = await Axios.get('http://localhost:3001/gastos');
      setGastos(gastosResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);  // Aquí puedes agregar dependencias si es necesario

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">HAFP</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active bg-dark" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Componente Ingresos */}
      <Ingresos 
        ingresosList = {ingresosList}
        setIngresos = {setIngresos}
        setDatoEditable = {setDatoEditable}
        fetchData = {fetchData}
      />

      <Routes>
        <Route 
          path = "/NewIngreso" 
          element = {<NewIngreso datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} fetchData = {fetchData} />} 
        />
      </Routes>

      {/* Componente Gastos */}
      <Gastos 
        gastosList={gastosList}
        setGastos={setGastos}
        setDatoEditable={setDatoEditable}
      />

      <Routes>
        <Route 
          path = "/NewGasto" 
          element={<NewGasto datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} />} 
        />
      </Routes>
    </>
  );
};

export default App;
