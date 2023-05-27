package main

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	port = "1111"
	collection *mongo.Collection
	uri = "mongodb+srv://aduran:Nu191036673@cluster0.lutxvb3.mongodb.net/"
)

type CarResponse struct {
	Message string `json:"message"`
}

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
	
	db := client.Database("carsdb")
	collection = db.Collection("cars")

	dal.SetCollection(collection)

	app := echo.New()

	app.GET("/", func(ctx echo.Context) error {
		return ctx.JSON(http.StatusOK, CarResponse{Message: "Welcome to my API. Try our routes"})
	})
	app.POST("/todolist/create", createTask)
	app.GET("/todolist/:id", getTask)
	app.GET("/todolist", getAllTasks)
	app.PUT("/todolist/:id", updateTask)
	app.DELETE("/todolist/:id", deleteTask)

	app.Logger.Fatal(app.Start(port))
}

func createTask(ctx echo.Context) error {

}

func getTask(ctx echo.Context) error {

}

func getAllTasks(ctx echo.Context) error {

}

func updateTask(ctx echo.Context) error {

}

func deleteTask(ctx echo.Context) error {

}