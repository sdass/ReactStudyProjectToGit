
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import './index.css';
import {createStore, combineReducers, applyMiddleware} from 'redux';

const defaults = { name: 'subra', hobby: 'chess', age: 32 };
//create own middleware
const logger_myownMiddleware = (store)=>(next)=>(action)=>{
 // if(typeof action.payload === "object"){
  console.log("action fired.." , action.type, action);
  if(action.type === 'ERROR_R'){
    next(myown_errorMiddleware);
  }else{
    next(action);  
  } 
    
}

const myown_errorMiddleware = (store)=>(next)=>(action)=>{
  // if(typeof action.payload === "object"){
     console.log("Entered . . . myown_errorMiddleware...");
     try{
      next(action);  
     } catch(e){
       console.error('CCCRRRAAAASSSSHHHH! ' + e);
     }
 }
const myMiddleware = applyMiddleware(logger_myownMiddleware, myown_errorMiddleware); //to add any number of middleware pass as args.

const userReducer = (state=defaults, action) => {
  //console.log('userReducer()... called');
  switch(action.type){
    case "CHANGE_NAME": {
      state = {...state, name: action.payload}
     // state.name = action.payload;
      console.log('defaults' + JSON.stringify(defaults));
      console.log('state' + JSON.stringify(state));
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

const singlepointReducer = combineReducers({
  user: userReducer, //what state : what reducer to handle
  listTodo: todoListReducer,
});


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
  return state; //imprtant to change the state
}

const store = createStore(singlepointReducer, {}, myMiddleware); //(singlepointReducer); //,  initial state={} 
     
store.subscribe( () => {console.log('store changed...', store.getState())} );

store.dispatch({ type: "CHANGE_NAME", payload: 'Davis Donald' });
store.dispatch({ type: "ERROR_R", payload: -5 }); //errorHandler middlewre will catch
store.dispatch({ type: "CHANGE_HOBBY", payload: 'hacking'});
store.dispatch({ type: "CHANGE_USER", payload: {name: 'X45', hobby: 'U78r', age: 451} });


/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/