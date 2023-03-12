import React from 'react';
import {useSelector} from 'react-redux';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
<button className="add-recipe-button"></button>
<button className="view-saved-recipes-button"></button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
