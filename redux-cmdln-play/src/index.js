
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore} from 'redux';


const reducer = function(state, action){
  console.log('reducer called...');
  switch(action.type){
    case "INC":
        state = state + action.payload;
     break;
  case "2X":
     //state = 2* state;
     state = 2* action.payload;
   break;      
  case "DEC10":
     //state = state -10;
     state = state -action.payload;
  break;  
   
  
  }
  return state;
}

const store = createStore(reducer, 3) //initial state=4 .state holder
store.subscribe( () => {console.log('store changed...', store.getState())} );

store.dispatch({ 
       
    type: "2X", payload: 2,
    type: "DEC10", payload: -10, 
    type: "INC", payload: 99  //last one reached
});

store.dispatch({  //2nd emitted event
  type: "2X", payload: 2,
});

store.dispatch({ type: "DEC10", payload: -5, });


/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/