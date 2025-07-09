import React, { Component } from 'react';
import '../styles/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefas: [],
      input: '',
      draggedIndex: null,
      draggedOverIndex: null,
      editingIndex: null,
      editingText: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleAdd = () => {
    if (this.state.input.trim()) {
      this.setState({
        tarefas: [...this.state.tarefas, this.state.input],
        input: ''
      });
    }
  }

  handleDelete = (index) => {
    const newTarefas = this.state.tarefas.filter((_, i) => i !== index);
    this.setState({ tarefas: newTarefas });
  }

  handleEdit = (index) => {
    this.setState({
      editingIndex: index,
      editingText: this.state.tarefas[index]
    });
  }

  handleSaveEdit = (index) => {
    if (this.state.editingText.trim()) {
      const newTarefas = [...this.state.tarefas];
      newTarefas[index] = this.state.editingText;
      this.setState({
        tarefas: newTarefas,
        editingIndex: null,
        editingText: ''
      });
    }
  }

  handleCancelEdit = () => {
    this.setState({
      editingIndex: null,
      editingText: ''
    });
  }

  handleEditChange = (e) => {
    this.setState({
      editingText: e.target.value
    });
  }

  handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      this.handleSaveEdit(index);
    } else if (e.key === 'Escape') {
      this.handleCancelEdit();
    }
  }

  handleDragStart = (e, index) => {
    this.setState({ draggedIndex: index });
    e.dataTransfer.effectAllowed = 'move';
  }

  handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.setState({ draggedOverIndex: index });
  }

  handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const { tarefas, draggedIndex } = this.state;
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      this.setState({ draggedIndex: null, draggedOverIndex: null });
      return;
    }

    const newTarefas = [...tarefas];
    const draggedItem = newTarefas[draggedIndex];
    
    // Remove o item da posição original
    newTarefas.splice(draggedIndex, 1);
    
    // Insere o item na nova posição
    newTarefas.splice(dropIndex, 0, draggedItem);
    
    this.setState({
      tarefas: newTarefas,
      draggedIndex: null,
      draggedOverIndex: null
    });
  }

  handleDragEnd = () => {
    this.setState({ draggedIndex: null, draggedOverIndex: null });
  }

  render() {
    const { tarefas, draggedIndex, draggedOverIndex, editingIndex, editingText } = this.state;
    
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
            onKeyPress={(e) => e.key === 'Enter' && this.handleAdd()}
          />
          <button 
            onClick={this.handleAdd}
            className="add-button"
          >
            Adicionar
          </button>
        </div>
        
        <ul className="tasks-list">
          {tarefas.map((tarefa, index) => (
            <li 
              key={index} 
              className={`task-item ${draggedIndex === index ? 'dragging' : ''} ${draggedOverIndex === index && draggedIndex !== index ? 'drag-over' : ''}`}
              draggable={editingIndex !== index}
              onDragStart={(e) => this.handleDragStart(e, index)}
              onDragOver={(e) => this.handleDragOver(e, index)}
              onDrop={(e) => this.handleDrop(e, index)}
              onDragEnd={this.handleDragEnd}
            >
              <span className="drag-handle">⋮⋮</span>
              
              {editingIndex === index ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editingText}
                    onChange={this.handleEditChange}
                    onKeyPress={(e) => this.handleKeyPress(e, index)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <button 
                      onClick={() => this.handleSaveEdit(index)}
                      className="save-button"
                    >
                      ✓
                    </button>
                    <button 
                      onClick={this.handleCancelEdit}
                      className="cancel-button"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="task-text">{tarefa}</span>
                  <div className="task-buttons">
                    <button 
                      onClick={() => this.handleEdit(index)}
                      className="edit-btn"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => this.handleDelete(index)}
                      className="delete-btn"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Main;