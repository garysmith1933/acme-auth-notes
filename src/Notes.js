import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Notes = (props)=> {
console.log(props.notes)
  return (
    <div>
      <Link to='/home'>Home</Link>
      <div>
        TODO - Ability of User to manage notes
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Notes);
