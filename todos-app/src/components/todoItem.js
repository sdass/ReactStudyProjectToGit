import React from 'react'

//import './todoItem.css';

export default class TodoItem extends React.Component {
    /* no use constructior removed
    constructor(properties){  super(properties);  }
    */

   removeItToddo5(id){
        console.log('removeItToddo5() in todoItem file')
        this.props.removeIt(id);
    }

    render(){
        return (
            <div className="todoWrapper">
                <button className="removeTodo" 
                onClick={ (e) =>{this.removeItToddo5(this.props.id)} }>Delete</button> Task: {this.props.todo2.text}
            </div>
        )
    }
}