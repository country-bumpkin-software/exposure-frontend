import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils}>
    <App className='container'/>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


