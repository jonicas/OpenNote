import React from 'react';



export default function(props) {
  return (
    <div className="tile">
      <div className="tile-content">
        <p className="tile-title">{props.data.title}</p>
        <p>{props.data.text}</p>
        <button className="btn btn-sm btn-link" onClick={() => { props.editNote(props.data) }}>Edit</button>
        <button className="btn btn-sm btn-link" onClick={() => {props.deleteNote(props.data)}}>Delete</button>
      </div>
    </div>
  );
}