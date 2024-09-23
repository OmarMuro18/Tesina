import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Ingresos from './components/Ingresos';
import Gastos from './components/Gastos';
import NewIngreso from './components/NewIngreso'; // Ajuste de la ruta
import NewGasto from './components/NewGasto';     // Ajuste de la ruta
import Axios from 'axios';

const App = () => {
  const [datos, setDatos] = useState([]);
  const [ingresosList, setIngresos] = useState([]);
  const [gastosList, setGastos] = useState([]);
  const [datoEditable, setDatoEditable] = useState([]);
  const navigate = useNavigate();
  const getIngresos = () => {
    Axios.get('http://localhost:3001/ingresos').then((response) => {
      setIngresos(response.data);
    });
  };


  useEffect(() => {
    getIngresos();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">H.A.F.P</a>
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
        ingresosList={ingresosList}
        setIngresos={setIngresos}
        setDatoEditable={setDatoEditable}
        getIngresos={getIngresos}
      />

      <Routes>
        <Route 
          path="/NewIngreso" 
          element={<NewIngreso datos={datos} setDatos={setDatos} datoEditable={datoEditable} setDatoEditable={setDatoEditable} />} 
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
          path="/NewGasto" 
          element={<NewGasto datos={datos} setDatos={setDatos} datoEditable={datoEditable} setDatoEditable={setDatoEditable} />} 
        />
      </Routes>
    </>
  );
};

export default App;
