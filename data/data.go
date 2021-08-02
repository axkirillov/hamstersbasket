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
	"strconv"
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
		return nil
	}
	if err != nil {
		fmt.Printf("Error creating database table: %q", err)
	}
	return &Controller{database: newDatabase}
}

func (c Controller) HandleGetData() gin.HandlerFunc {
	return func(context *gin.Context) {
		rows, err := c.database.Query("SELECT id, text, checked FROM list")
		if err != nil {
			context.String(http.StatusInternalServerError,
				fmt.Sprintf("Error reading from list: %q", err))
			return
		}

		defer func(rows *sql.Rows) {
			err := rows.Close()
			if err != nil {
				context.String(http.StatusInternalServerError,
					fmt.Sprintf("Error reading from list: %q", err))
			}
		}(rows)

		var items []model.ListItem

		for rows.Next() {
			var item model.ListItem
			if err := rows.Scan(&item.Id, &item.Text, &item.Checked); err != nil {
				context.String(http.StatusInternalServerError,
					fmt.Sprintf("Error reading from list: %q", err))
				return
			}
			items = append(items, item)
		}

		context.JSON(http.StatusOK, items)

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

func (c Controller) DeleteElement() gin.HandlerFunc {
	return func(context *gin.Context) {
		var err error
		idString, _ := context.Params.Get("id")
		id, err := strconv.Atoi(idString)
		_, err = c.database.Exec(fmt.Sprintf("DELETE FROM list WHERE id=%d", id))
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}
	}
}
