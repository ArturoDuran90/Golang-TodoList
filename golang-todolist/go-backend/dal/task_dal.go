package dal

import (
	"context"
	"errors"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

type Task struct {
	ID       int    `json:"id"`
	Todo     string `json:"todo"`
}

func SetCollection(c *mongo.Collection) {
	collection = c
}

func GetAllTasks() ([]Task, error) {
	var tasks []Task

	cur, err := collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var task Task
		if err := cur.Decode(&task); err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}

	return tasks, nil
}

func CreateTask(task *Task) error {
	// Check if the task already exists
	existingTask, err := GetTask(task.ID)
	if err == nil && existingTask != nil {
		return fmt.Errorf("Task with ID %d already exists", task.ID)
	}

	_, err = collection.InsertOne(context.Background(), task)
	if err != nil {
		return err
	}

	return nil
}

func GetTask(taskID int) (*Task, error) {
	var task Task
	err := collection.FindOne(context.Background(), bson.M{"id": taskID}).Decode(&task)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil // Task not found
		}
		return nil, err
	}
	return &task, nil
}

func UpdateTask(taskID int, updatedTask *Task) error {
	_, err := collection.UpdateOne(context.Background(), bson.M{"id": taskID}, bson.M{"$set": updatedTask})
	if err != nil {
		return err
	}
	return nil
}

func DelteTask(taskID int) error {
	_, err := collection.DeleteOne(context.Background(), bson.M{"id": taskID})
	if err != nil {
		return err
	}
	return nil
}
