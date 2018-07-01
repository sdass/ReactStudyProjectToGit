import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import TodoInput from './components/todoinput';
import TodoItem from './components/todoItem';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: [
        {id: 0, text: 'make dinner' },
        {id: 1, text: 'do laundry' },
        {id: 2, text: 'teach children' }
      ],
      nextId : 3
    };

    this.addTodoOfApp = this.addTodoOfAppFunc.bind(this);
    this.rmTodoOfApp = this.rmTodoOfAppFunc.bind(this);
  }//constructor ends

  addTodoOfAppFunc(todoText){
    console.log('this.addTodoOfApp called ...'  + todoText);  
    let todos1 = this.state.todos.slice(); //deepcopy on a local copy
    todos1.push({id: this.state.nextId, text: todoText});
    console.log(JSON.stringify(todos1));
    this.setState({ todos: todos1, nexId: ++this.state.nextId})

  }
  rmTodoOfAppFunc(indexk0){
    console.log('rmTodoOfAppFunc called ...'  + indexk0);   
    let todos1 = this.state.todos.slice();
    let todos2 = todos1.filter( (x) => { return (x.id != indexk0)});
    console.log('todos2=' + JSON.stringify(todos2));
    this.setState({ todos: todos2}); // nextId: --this.state.nextId });

  }  

  render() {
    return (
      <div className="App">
        <Header/>
        <TodoInput todotext="" addinTodo={this.addTodoOfApp}/>
        <ul>
          {
          this.state.todos.map((x) => {
          //console.log('item=' + + ' ' + x.id + ' ' +  x.text);
             return <TodoItem todo2={x} key={x.id}  id={x.id} removeIt={this.rmTodoOfApp}/>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
