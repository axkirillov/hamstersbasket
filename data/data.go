package data

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/axkirillov/hamstersbasket/model"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"io/ioutil"
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
	_, err = newDatabase.Exec("CREATE TABLE IF NOT EXISTS list (text varchar(40), checked boolean)")
	if err != nil {
		fmt.Printf("Error creating database table: %q", err)
	}
	return &Controller{database: newDatabase}
}

func (Controller) HandleGetData() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.JSON(http.StatusOK, []model.ListItem{
			{Text: "bread", Checked: false},
			{Text: "butter", Checked: false},
			{Text: "banana", Checked: true},
		})
		return
	}
}

func (c Controller) AddElement() gin.HandlerFunc {
	return func(context *gin.Context) {
		bytes, err := ioutil.ReadAll(context.Request.Body)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
		newItem := model.ListItem{}
		err = json.Unmarshal(bytes, &newItem)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		command := fmt.Sprintf("INSERT INTO list VALUES ('%s', '%t')", newItem.Text, newItem.Checked)

		_, err = c.database.Exec(command)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		context.JSON(http.StatusOK, gin.H{"status": "ok"})
		return
	}
}
