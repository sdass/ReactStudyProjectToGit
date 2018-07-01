import React from 'react'

export default class TodoInput extends React.Component {
    constructor(properties){
        super(properties); 

        this.state = {value: "test state"};

        this.handleChange = this.handleChangeFunc.bind(this);
        this.addTodo = this.addTodoFunc.bind(this);
    }

    handleChangeFunc(e){        
        //console.log('now input called...' + e.currentTarget.value);
        this.setState({value: e.target.value});
        
    }
    addTodoFunc(todo){
        console.log('addTodoFunc called...' + todo);
        if(todo.length > 0){
           this.props.addinTodo(todo); //addTodo(todo);
            this.setState({value: 'emptied by me'});
        }
        
        
    }

    render(){
        return ( 
            <div>
                <input type='text' value={this.state.value} onChange={this.handleChange} />
                <button className='btn btn-primary' onClick={ () => this.addTodo(this.state.value)}>
                    Submit
                </button>

             </div>

        );
    }
}