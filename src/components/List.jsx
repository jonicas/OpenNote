import React, { Component } from 'react';

import ListItem from './ListItem';


class List extends Component {
  render() {
    return (
      <div className="content panel" id="note-list">
        <div className="panel-header">
          <div className="panel-title">My Notes</div>
        </div>
        <div className="panel-body">
          <ul>
            {this.props.notes.map((note) =>
              <div key={note.id}>
                <ListItem 
                  editNote={this.props.onEdit}
                  deleteNote={this.props.onDelete}
                  key={note.id} 
                  data={note}/>
                <div className="divider"></div>
              </div>
            )}
          </ul>
        </div>
        <div className="panel-footer">
          <button className="btn" onClick={this.props.onInclude}>New Note</button>
        </div>
      </div>
    );
  }
}

export default List;