import './general.css';
import './createTask.css';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTask(){
  const [clicled, setClicked] = useState(true);

  const refreshPage = () => {
    window.location.href='/';
  }

  let navigate = useNavigate();
  const goHome = () => {
    let path = `/`;
    navigate(path);
  };

  const createList = () => {
    setClicked(false);
  };

  return(
    <>
      <div id="homepg-cont">
        <header onClick={refreshPage}>Task Tracker</header>
        <div id='homepg-btns'>
          <span id='create-cont'>
            <div id='create-tasks-cont'>
              <p>Type your task below:</p>
              <input type='text' maxLength="50"/>
              {
                clicled? <button id='add-task-btn' onClick={createList}>Add task</button> :<p></p>
              }
            </div>
          </span>
          <button id='view-list-cont' onClick={goHome}>
            <div id='view-list-Title'>Go Home</div>
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateTask;