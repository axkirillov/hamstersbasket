package data

import (
	"database/sql"
	"fmt"
	"github.com/axkirillov/hamstersbasket/model"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
)

type Controller struct {
	database *sql.DB
}

func Init() *Controller {
	newDatabase, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}
	_, err = newDatabase.Exec("CREATE TABLE IF NOT EXISTS elements (text varchar(40), checked boolean)")
	if err != nil {
		fmt.Printf("Error creating database table: %q", err)
	}
	return &Controller{database: newDatabase}
}

func (Controller) HandleGetData() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.JSON(http.StatusOK, []model.Element{
			{Text: "bread", Checked: false},
			{Text: "butter", Checked: false},
			{Text: "banana", Checked: true},
		})
		return
	}
}

func (c Controller) AddElement() gin.HandlerFunc {
	return func(context *gin.Context) {
		return
	}
}
