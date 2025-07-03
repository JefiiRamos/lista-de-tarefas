import React, { Component } from 'react';
import '../styles/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefas: [],
      input: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleAdd = () => {
    this.setState({
      tarefas: [...this.state.tarefas, this.state.input],
      input: ''
    });
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-title">Lista de Tarefas</h1>
        
        <div className="input-container">
          <input 
            type="text" 
            onChange={this.handleChange} 
            placeholder='Digite uma tarefa' 
            className="main-input"
            value={this.state.input}
          />
          <button 
            onClick={this.handleAdd}
            className="add-button"
          >
            Adicionar
          </button>
        </div>
        
        <ul className="tasks-list">
          {this.state.tarefas.map((tarefa, index) => (
            <li key={index} className="task-item">{tarefa}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Main;