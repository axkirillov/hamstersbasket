package data

import (
	"database/sql"
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
	return &Controller{database: newDatabase}
}

func (Controller) HandleDataRequest() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, []model.Element{
			{Text: "bread", Checked: false},
			{Text: "butter", Checked: false},
			{Text: "banana", Checked: true},
		})
		return
	}
}
