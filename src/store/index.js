import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const GET_NOTES = 'GET_NOTES'
const CREATE_NOTE = 'CREATE_NOTE'
const DELETE_NOTES = 'DELETE_NOTES'

const notes = (state = [], action)=> {
  if(action.type === "GET_NOTES") {
    return action.notes
  }
  
  if(action.type === 'DELETE_NOTES') {
    return state.filter(note => note.id !== action.note.id)
  }
  return state;
};

const auth = (state = {}, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};


const loadNotes = ()=> {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token')
    
    if(token) {
      const response = await axios.get('/api/notes', {
        headers: {
          authorization: token
        }
      })
     dispatch({type: GET_NOTES, notes: response.data})
    }
  }
}
  const deleteNotes = (note) => {
  return async(dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.delete(`/api/notes/${note.id}`, {
      headers: {
        authorization: token
      }
    });
    dispatch({type: DELETE_NOTES, note})
  }
}

const logout = ()=> {
  window.localStorage.removeItem('token');
  return {
    type: 'SET_AUTH',
    auth: {}
  };
};

const signIn = (credentials)=> {
  return async(dispatch)=> {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    return dispatch(attemptLogin());
  }
};
const attemptLogin = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  }
}

const store = createStore(
  combineReducers({
    auth,
    notes
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout, loadNotes, deleteNotes };

export default store;
