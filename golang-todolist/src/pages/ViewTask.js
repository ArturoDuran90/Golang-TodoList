import "./general.css";
import "./viewTask.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ViewTask() {
  const refreshPage = () => {
    window.location.href = "/";
  };

  let navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const goHome = () => {
    let path = "/";
    navigate(path);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    var url = "http://localhost:1111/todolist";
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setTodo(data);
      })
      .catch((e) => console.log(e));
  };

  const editTask = (taskId) => {
    const taskToEdit = todo.find((task) => task.id === taskId);
    setEditedTask(taskToEdit);
  };

  const handleTaskChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const updateTask = () => {
    fetch(`http://localhost:1111/todolist/${editedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEditedTask(null);
        getData();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:1111/todolist/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <div id="homepg-cont">
        <header onClick={refreshPage}>Task Tracker</header>
        <div id="homepg-btns">
          <button id="create-list-cont" onClick={goHome}>
            <div id="create-list-Title">Go Home</div>
          </button>
          <span id="view-cont">
            <div id="view-tasks">
              <p>Created Tasks:</p>
              <div id="icons">
                <span id="taskOnList">
                  {todo === null ? (
                    <div className="tasks-cont-null">
                      <div className="task-name">No Tasks Available</div>
                    </div>
                  ) : (
                    todo.map((task, index) => (
                      <div
                        key={task.id}
                        className="tasks-cont"
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={handleMouseOut}
                      >
                        {editedTask?.id === task.id ? (
                          <input
                            id="update-task-input"
                            type="text"
                            name="todo"
                            value={editedTask.todo}
                            onChange={handleTaskChange}
                          />
                        ) : (
                          <div className="task-name">{task.todo}</div>
                        )}
                        {hoveredIndex === index && (
                          <>
                            {editedTask?.id === task.id ? (
                              <div
                                className="iconImage"
                                title="Update"
                                onClick={updateTask}
                              >
                                &#10004;
                              </div>
                            ) : (
                              <>
                                <div
                                  className="iconImage"
                                  title="Delete"
                                  onClick={() => deleteTask(task.id)}
                                >
                                  &#10006;
                                </div>
                                <div
                                  className="iconImage"
                                  title="Edit"
                                  onClick={() => editTask(task.id)}
                                >
                                  &#9998;
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  )}
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
