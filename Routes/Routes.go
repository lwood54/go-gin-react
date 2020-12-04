package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/lwood54/fullstack_explore/controllers"
)

// example: https://github.com/gin-contrib/cors

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	r := gin.Default()
	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:3000"},
	// 	AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "OPTIONS", "DELETE"},
	// 	AllowHeaders:     []string{"Origin", "Content-Type"},
	// 	ExposeHeaders:    []string{"Content-Length", "Content-Type", "Accept"}
	// 	AllowCredentials: true,
	// 	MaxAge:           12 * time.Hour,
	// }))
	// r.Use(cors.Default())
	grp1 := r.Group("/api")
	{
		grp1.GET("user", controllers.GetUsers)
		grp1.POST("user", controllers.CreateUser)
		grp1.GET("user/:id", controllers.GetUserByID)
		grp1.PUT("user/:id", controllers.UpdateUser)
		grp1.DELETE("user/:id", controllers.DeleteUser)
	}
	return r
}
