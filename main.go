package main

import (
	"github.com/axkirillov/hamstersbasket/data"
	"github.com/gin-gonic/gin"
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

	dataController := data.Init()

	router.GET("/data", dataController.HandleGetData())

	router.POST("/data/add", dataController.AddElement())
	router.DELETE("/data/delete/:id", dataController.DeleteElement())
	router.PUT("/data/update/:id", dataController.UpdateElement())

	var err error
	err = router.Run(":" + port)
	if err != nil {
		return
	}
}
