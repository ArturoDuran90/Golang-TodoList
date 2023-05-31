import './general.css';
import './createTask.css';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const refreshPage = () => {
    window.location.href = '/';
  }

  let navigate = useNavigate();
  const [clicked, setClicked] = useState(true);
  const [taskInput, setTaskInput] = useState("");

  const goHome = () => {
    let path = `/`;
    navigate(path);
  };

  const createList = () => {
    if (taskInput.trim() === "") {
      return;
    }
  
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      todo: taskInput
    };
  
    fetch("http://localhost:1111/todolist/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log("New task added:", data);
        setClicked(false);
      })
      .catch(error => {
        console.log("Error creating task:", error);
      });
  };
  
  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  return (
    <>
      <div id="homepg-cont">
        <header onClick={refreshPage}>Task Tracker</header>
        <div id='homepg-btns'>
          <span id='create-cont'>
            <div id='create-tasks-cont'>
              <p>Type your task below:</p>
              <input type='text' maxLength="50" value={taskInput} onChange={handleInputChange} />
              {
                clicked ? <button id='add-task-btn' onClick={createList}>Add task</button> : <p></p>
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
