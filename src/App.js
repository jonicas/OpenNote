import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import List from './components/List'
import Draft from './components/Draft';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {id: 1, title: 'First Note', text: 'This is the first note text'},
      notes: [
        {id: 1, title: 'First Note', text: 'This is the first note text'},
        {id: 2, title: 'Second Note', text: 'This is the second note text'},
        {id: 3, title: 'Third Note', text: 'This is the third note text'},
        {id: 4, title: 'Fourth Note', text: 'This is the fourth note text'}
      ]
    }

    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.delNote = this.delNote.bind(this);
  }

  onChange() {
    console.log('Passando pelo OnChnage:', this.state);
  }

  addNote() {
    this.setState({
      note: {id: 5, title: 'New Note', text: 'Just a new Note'}
    });

    console.log('new note added:', this.state);
  }

  editNote(note) {
    this.setState({note: note});
    console.log('editing note:', note);
  }

  delNote(note) {
    const notes = this.state.notes.filter((item) => {
      return item.id !== note.id;
    });

    this.setState({
      notes: notes
    });
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <Navbar/>
          </div>
        </div>
        <div className="columns">
          <div className="column col-3 hide-md">
            <List 
              notes={this.state.notes} 
              onEdit={this.editNote}
              onDelete={this.delNote}
              onInclude={this.addNote}
            />
          </div>
          <div className="column col-9 col-md-12">
            <Draft note={this.state.note}/>
            <button className="btn btn-primary">Save</button>
            <button className="btn">Discart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
