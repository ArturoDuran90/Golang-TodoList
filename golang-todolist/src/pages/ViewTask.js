import './general.css';
import './viewTask.css';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewTask(){
  const refreshPage = () => {
    window.location.href='/';
  }

  let navigate = useNavigate();
  const goHome = () => {
    let path = `/`;
    navigate(path);
  };

  const createList = () => {

  };

  const editTask = () => {

  };

  const deleteTask = () => {

  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return(
    <>
      <div id="homepg-cont">
        <header onClick={refreshPage}>Task Tracker</header>
        <div id='homepg-btns'>
          <button id='create-list-cont' onClick={goHome}>
            <div id='create-list-Title'>Go Home</div>
          </button>
          <span id='view-cont'>
            <div id='view-tasks'>
              <p>Created Tasks:</p>
              <div id='icons'>
                <span id='taskOnList'>
                  <div className='tasks-cont' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <div className='task-name'>Create a different task for another computer today</div>
                    {isHovering && 
                      <>
                        {/* <div className='iconImage' title='Confirm'>&#10004;</div> */}
                        <div className='iconImage' title='Delete' onClick={deleteTask}>&#10006;</div>
                        <div className='iconImage' title='Edit' onClick={editTask}>&#9998;</div>
                      </>
                    }
                  </div>
                </span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}
export default ViewTask;