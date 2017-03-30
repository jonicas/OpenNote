import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import List from './components/List'
import Draft from './components/Draft';
//import Navbar from './components/Navbar';
import { EditorState, ContentState } from 'draft-js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'new',
      editorState: EditorState.createEmpty(),
      note: {},
      notes: []
    }

    this.onChange = (editorState) => { this.setState({editorState}) };

    this.newNote = this.newNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.delNote = this.delNote.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  newNote() {
    const note = {
      title: '',
      text: '',
      createdAt: new Date()
    };

    const contentState = ContentState.createFromText('');
    const editorState = EditorState.push(this.state.editorState, contentState);    
    this.setState({note, editorState});
  }

  editNote(note) {
    const contentState = ContentState.createFromText(note.text);
    const editorState = EditorState.push(this.state.editorState, contentState, 'insert-characters');    
    
    this.setState({editorState, note, status: 'edit'});
  }

  delNote(note) {
    const notes = this.state.notes.filter((item) => {
      return item.text !== note.text;
    });

    this.setState({
      notes: notes
    });
  }

  onSave() {
    const currentContent = this.state.editorState.getCurrentContent();

    if (this.state.status === 'new') {
      const note = {
        createdAt: new Date(),
        text:  currentContent.getPlainText(),
        title: 'A New Note'
      }

      this.setState({
        note: {},
        notes: this.state.notes.concat(note),
        editorState: EditorState.push(this.state.editorState, ContentState.createFromText(''))
      });

    } else {
      this.setState({
        notes: this.state.notes.map((note) => {
          if (note.text === this.state.note.text) {
            note.text = currentContent.getPlainText();
          }
        return note;
        }),
        note: {},
        editorState: EditorState.push(this.state.editorState, ContentState.createFromText(''))
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-3 hide-md">
            <List 
              notes={this.state.notes} 
              onEdit={this.editNote}
              onDelete={this.delNote}
              onInclude={this.newNote}
            />
          </div>
          <div className="column col-9 col-md-12">
            <Draft 
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
            <button className="btn btn-primary" onClick={this.onSave}>SAVE</button>
            <button className="btn">CANCEL</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
