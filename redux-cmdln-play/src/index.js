
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import './index.css';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; //thunk is a redux middleware
import axios from "axios";//xhrRequest lib
import promise from 'redux-promise-middleware';

const apiURL = "https://api.publicapis.org/categories";

const defaults = { name: 'subra', hobby: 'chess', age: 32 };
//create own middleware
const logger_myownMiddleware = (store)=>(next)=>(action)=>{
 // if(typeof action.payload === "object"){
  //console.log("action fired.." , action.type, action);
  if(action.type === 'ERROR_R'){
    next(myown_errorMiddleware);
  }else{
    next(action);  
  } 
    
}

const myown_errorMiddleware = (store)=>(next)=>(action)=>{
  // if(typeof action.payload === "object"){
    // console.log("Entered . . . myown_errorMiddleware...");
     try{
      next(action);  
     } catch(e){
       console.error('CCCRRRAAAASSSSHHHH! ' + e);
     }
 }
const myMiddleware = applyMiddleware(thunk, promise(), logger, logger_myownMiddleware, myown_errorMiddleware); //to add any number of middleware pass as args.

const userReducer = (state=defaults, action) => {
  //console.log('userReducer()... called');
  switch(action.type){
    case "CHANGE_NAME": {
      state = {...state, name: action.payload}
     // state.name = action.payload;
     // console.log('defaults' + JSON.stringify(defaults));
     // console.log('state' + JSON.stringify(state));
      break;
    }
    case "CHANGE_HOBBY": {
      //state.hobby = action.payload;
      state = {...state, hobby: action.payload}
      break;
    }
    case "CHANGE_USER": {
      //state.name = action.payload.name; state.age = action.payload.age; state.hobby = action.payload.hobby;
      state = {...state, name: action.payload.name, hobby: action.payload.hobby, age: action.payload.age};
      break;
    }        
  }
  return state;
};

const todoListReducer = (state=[], actions) => { //state={}
  //console.log('todoListReducer()... called'); //must always return something|state
  return state;
};

const initialState = { fetching: false, fetched: false, data:{}, error: null}

const reducer2 = function(state=initialState, action){
  //console.log('reducer called...');
  switch(action.type){
   case "FETCH_DATA_START", "FETCH_DATA_PENDING":
     state = {...state, fetching: true};
  break;    
  case "RECEIVED_DATA", "FETCH_DATA_FULFILLED":
  state = {...state, fetching: false, fetched: true, data: action.payload}
  break;    
  case "DATA_FETCH_ERROR", "FETCH_DATA_REJECTED":
  state = {...state, fetching: false, error: action.payload};
  break;    
  
  }
  return state; //imprtant to change the state
}

const singlepointReducer = combineReducers({
  user: userReducer, //what state : what reducer to handle
  listTodo: todoListReducer,
  ajaxapi: reducer2 // seems reducer2 got to be forward declaring

});


const reducer = function(state, action){
  //console.log('reducer called...');
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
  return state; //imprtant to change the state
}

const store = createStore(singlepointReducer, {}, myMiddleware); //(singlepointReducer); //,  initial state={} 
     
store.subscribe( () => {console.log('store changed...', store.getState())} );

store.dispatch({
  type: "FETCH_DATA",
  payload: axios.get(apiURL+'/fdsfdfs')
} ); //using promise with[out] thunk

/* using thunk only.
store.dispatch((dispatcher2)=>{ 
  
  //console.log('Inside new way . . .1 ');
  //dispatcher2({type: 'A'}); 
  //console.log('Inside new way . . .2');
    // do something asynch
   // dispatcher2({type: "CHANGE_NAME"}); //thunk middleware allow multiple call to dispatcher2
    
   dispatcher2({type: 'FETCH_DATA_START'}); // UI will show loading spinner
   //do asynch call
   axios.get(apiURL)
   //axios.get(apiURL+'/gberror') // to simiulate error
   .then((response) =>{ 
     dispatcher2({type: 'RECEIVED_DATA', payload: response.data})
   }).catch((err) =>{
     dispatcher2({type: 'DATA_FETCH_ERROR', payload: err})
   })
});
*/

//store.dispatch({ type: "CHANGE_NAME", payload: 'Davis Donald' });
//store.dispatch({ type: "ERROR_R", payload: -5 }); //errorHandler middlewre will catch
//store.dispatch({ type: "CHANGE_HOBBY", payload: 'hacking'});
//store.dispatch({ type: "CHANGE_USER", payload: {name: 'X45', hobby: 'U78r', age: 451} });


/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/