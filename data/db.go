package data

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
	"os"
)

type DataController struct {
	database *sql.DB
}

func Init() *DataController {
	newDatabase, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Error opening database: %q", err)
	}
	return &DataController{database: newDatabase}
}

func (DataController) HandleDataRequest() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Print("code reached this point")
		return
	}
}
