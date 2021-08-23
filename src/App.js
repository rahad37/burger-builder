import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Components/Main';
import {Provider} from 'react-redux';
import {Store} from './Redux/Store';
const App = () => {
  return (
    <div>
      <Provider store={Store}>
      <BrowserRouter>
          <Main/>
      </BrowserRouter>
      </Provider>
     
    </div>
  );
};

export default App;