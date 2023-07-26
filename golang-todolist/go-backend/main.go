package main

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"todolist.com/dal"
)

var (
	port       = ":1111"
	collection *mongo.Collection
	uri        = dal.MongoUri
	idCounter  = 0
)

type TaskResponse struct {
	Message string `json:"message"`
}

type Task dal.Task

func main() {
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("todolistdb")
	collection = db.Collection("todolist")

	dal.SetCollection(collection)

	app := echo.New()

	app.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	app.GET("/", func(ctx echo.Context) error {
		return ctx.JSON(http.StatusOK, TaskResponse{Message: "Welcome to my API. Try our routes"})
	})

	app.POST("/todolist/create", createTask)
	app.GET("/todolist/:id", getTask)
	app.GET("/todolist", getAllTasks)
	app.PUT("/todolist/:id", updateTask)
	app.DELETE("/todolist/:id", deleteTask)

	app.Logger.Fatal(app.Start(port))
}

func createTask(ctx echo.Context) error {
	task := new(Task)
	if err := ctx.Bind(task); err != nil {
		return ctx.JSON(http.StatusBadRequest, TaskResponse{Message: "Invalid request payload"})
	}

	task.ID = generateNewID() // Assign a new ID to the task

	err := dal.CreateTask((*dal.Task)(task))
	if err != nil {
		log.Println("Error creating task:", err) // Log the error
		return ctx.JSON(http.StatusInternalServerError, TaskResponse{Message: "Error creating task"})
	}

	return ctx.JSON(http.StatusCreated, task)
}

func generateNewID() int {
	idCounter++
	return idCounter
}

func getTask(ctx echo.Context) error {
	taskID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, TaskResponse{Message: "Invalid Task ID"})
	}

	task, err := dal.GetTask(taskID)
	if err != nil {
		return ctx.JSON(http.StatusNotFound, TaskResponse{Message: "Task not found"})
	}

	return ctx.JSON(http.StatusOK, task)
}

func getAllTasks(ctx echo.Context) error {
	tasks, err := dal.GetAllTasks()
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, TaskResponse{Message: "Error retrieving tasks"})
	}
	return ctx.JSON(http.StatusOK, tasks)
}

func updateTask(ctx echo.Context) error {
	taskID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, TaskResponse{Message: "Invalid Task ID"})
	}

	updatedTask := new(dal.Task)
	if err := ctx.Bind(updatedTask); err != nil {
		return ctx.JSON(http.StatusBadRequest, TaskResponse{Message: "Invalid request payload"})
	}

	err = dal.UpdateTask(taskID, updatedTask)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, TaskResponse{Message: "Error updating task"})
	}

	return ctx.JSON(http.StatusOK, updatedTask)
}

func deleteTask(ctx echo.Context) error {
	taskID, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		return ctx.JSON(http.StatusBadRequest, TaskResponse{Message: "Invalid Task ID"})
	}

	err = dal.DeleteTask(taskID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, TaskResponse{Message: "Error deleting task"})
	}

	return ctx.JSON(http.StatusOK, TaskResponse{Message: "Task deleted"})
}
