import './homepage.css';
import './general.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const refreshPage = () => {
    window.location.href = '/';
  };

  let navigate = useNavigate();
  const createList = () => {
    let path = `/create`;
    navigate(path);
  };

  const viewList = () => {
    let path = `/view`;
    navigate(path);
  };

  return (
    <>
      <div id="homepg-cont">
        <header onClick={refreshPage}>Task Tracker</header>
        <div id='homepg-btns'>
          <button id='create-list-cont' onClick={createList}>
            <div id='create-list-title'>Create Task</div>
          </button>
          <button id='view-list-cont' onClick={viewList}>
            <div id='view-list-title'>View Task</div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
