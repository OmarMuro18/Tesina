import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Ahorros from './components/Ahorros';
import Deudas from './components/Deudas';
import Gastos from './components/Gastos';
import Ingresos from './components/Ingresos';
import Tarjetas from './components/Tarjetas'; 

import BarraIngresos from './components/Barras/BarraIngresos';
import BarraAhorro from './components/Barras/BarraAhorro';
import BarraTC from './components/Barras/BarraTC';
import BarraDeudas from './components/Barras/BarraDeudas';
import BarraGastos from './components/Barras/BarraGastos';


import NewAhorro from './components/AddNew/NewAhorro';
import NewDeuda from './components/AddNew/NewDeuda';
import NewGasto from './components/AddNew/NewGasto'; 
import NewIngreso from './components/AddNew/NewIngreso';
import NewTarjeta from './components/AddNew/NewTarjeta';   
 
import Axios from 'axios';

function App () {

  const [datos, setDatos] = useState([]);
  const [ingresosList, setIngresos] = useState([]);
  const [gastosList, setGastos] = useState([]);
  const [deudasList, setDeudas] = useState([]); 
  const [tarjetasList, setTarjetas] = useState([]); 
  const [ahorrosList, setAhorros] = useState([]); 
  const [datoEditable, setDatoEditable] = useState([]);


  const fetchData = useCallback(async () => {
    try {
      const gastosResponse = await Axios.get('http://localhost:3001/gastos');
      setGastos(gastosResponse.data);

      const ingresosResponse = await Axios.get('http://localhost:3001/ingresos');
      setIngresos(ingresosResponse.data);
      
      const deudasResponse = await Axios.get('http://localhost:3001/deudas');
      setDeudas(deudasResponse.data);
      
      const tarjetasResponse = await Axios.get('http://localhost:3001/tarjetas');
      setTarjetas(tarjetasResponse.data);
      
      const ahorrosResponse = await Axios.get('http://localhost:3001/ahorros');
      setAhorros(ahorrosResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);  

  useEffect(() => {
    fetchData();
  }, [gastosList, ingresosList, deudasList, tarjetasList, ahorrosList]);

  return (
  <Router>
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
    <BarraIngresos/>
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

      <BarraGastos/>

      {/* Componente Gastos */}
      <Gastos 
        gastosList={gastosList}
        setGastos={setGastos}
        setDatoEditable={setDatoEditable}
        fetchData = {fetchData}
      />

      <Routes>
        <Route 
          path = "/NewGasto" 
          element={<NewGasto datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} fetchData = {fetchData} />} 
        />
      </Routes>

      <BarraDeudas/>

      {/* Componente Deudas */}
      <Deudas 
        deudasList={deudasList}
        setdeudas={setDeudas}
        setDatoEditable={setDatoEditable}
        fetchData = {fetchData}
      />

      <Routes>
        <Route 
          path = "/NewDeuda" 
          element={<NewDeuda datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} fetchData = {fetchData} />} 
        />
      </Routes>
      
      <BarraTC/>

      {/* Componente tarjetas */}
      <Tarjetas 
        tarjetasList={tarjetasList}
        settarjetas={setTarjetas}
        setDatoEditable={setDatoEditable}
        fetchData = {fetchData}
      />

      <Routes>
        <Route 
          path = "/NewTarjeta" 
          element={<NewTarjeta datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} fetchData = {fetchData} />} 
        />
      </Routes>
      
      <BarraAhorro/>

      {/* Componente ahorros */}
      <Ahorros 
        ahorrosList={ahorrosList}
        setahorros={setAhorros}
        setDatoEditable={setDatoEditable}
        fetchData = {fetchData}
      />

      <Routes>
        <Route 
          path = "/NewAhorro" 
          element={<NewAhorro datos = {datos} setDatos = {setDatos} datoEditable = {datoEditable} setDatoEditable = {setDatoEditable} fetchData = {fetchData} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
