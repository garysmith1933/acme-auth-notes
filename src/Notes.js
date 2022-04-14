import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNotes } from './store'
import CreateNote from './CreateNote'

const Notes = ({notes, auth, deleteNote})=> {
console.log(notes)
  return (
    <div>
      <Link to='/home'>Home</Link>
      <div>
        <h5> Notes for {auth.username} </h5>
        {
          notes.map(note => {
            return (
              <li key={note.id}> {note.text} <button onClick={() => deleteNote(note)}> X </button> </li>
            )
          })
        }
        <CreateNote/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (note)=> dispatch(deleteNotes(note))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Notes);
