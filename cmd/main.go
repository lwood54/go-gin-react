package main

import (
	"time"

	"github.com/gin-gonic/contrib/static"

	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/jinzhu/gorm"
	"github.com/lwood54/fullstack_explore/config"
	"github.com/lwood54/fullstack_explore/models"
	"github.com/lwood54/fullstack_explore/routes"
)

var err error

func main() {
	config.DB, err = gorm.Open("mysql", config.DbURL(config.BuildDBConfig()))
	if err != nil {
		fmt.Println("Status:", err)
	}
	defer config.DB.Close()
	config.DB.AutoMigrate(&models.User{})
	// Set the router as the default one shipped with Gin
	r := routes.SetupRouter()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type", "Accept"},
		AllowCredentials: true,
		// AllowOriginFunc: func(origin string) bool {  // allows change/add of origin after registered
		// 	return origin == "https://github.com"
		// },
		MaxAge: 12 * time.Hour,
	}))
	// Serve frontend static files
	r.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	// Start and run the server
	r.Run(":5000")
}
