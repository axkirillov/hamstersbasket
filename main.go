package main

import (
	"github.com/gin-gonic/gin"
	"github.com/heroku/go-getting-started/db"
	_ "github.com/heroku/x/hmetrics/onload"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})

	dataController := db.Init()

	router.GET("/data", dataController.HandleDataRequest())

	var err error
	err = router.Run(":" + port)
	if err != nil {
		return
	}
}
