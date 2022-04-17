import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './components/landing/Index';
import Kalender from './components/kalender/Kalender';
import Uebersicht from './components/uebersicht/Uebersicht';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        
          <Route path = '/' element = {<Index/>} exact/>
          <Route path = '/kalender' element = {<Kalender/>} exact/>
          <Route path = '/uebersicht' element = {<Uebersicht/>} exact/>
        
      </Routes>
  </BrowserRouter>
  /*<React.StrictMode>
    <Kalender />
  </React.StrictMode>,*/
);

