import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'materialize-css/dist/css/materialize.min.css';
import reduxThunk from 'redux-thunk';
import App from './Components/App.js';
import reducers from './reducers/index'


const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(<Provider store={store}>
         <App/> 
</Provider>,
     document.querySelector('#root')); 

  console.log('STripe key is',process.env.REACT_APP_STRIPE_KEY);
  console.log('ENVIRONMENT IS',process.env.NODE_ENV);   