package controllers

import (
	"fmt"
	"net/http"

	"github.com/lwood54/fullstack_explore/models"

	"github.com/gin-gonic/gin"
)

//GetUsers ... Get all users
func GetUsers(c *gin.Context) {
	var user []models.User
	err := models.GetAllUsers(&user)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
	}
}

//CreateUser ... Create User
func CreateUser(c *gin.Context) {
	// todo: need to check that email is unique and autogenerate IDs
	// user should  not select id or have email that is duplicate
	var user models.User
	c.BindJSON(&user)
	err := models.CreateUser(&user)
	if err != nil {
		fmt.Println(err.Error())
		// c.AbortWithStatus(http.StatusNotFound)
		c.JSON(http.StatusNotFound, gin.H{
			"message": "There was an issue creating user.",
			"error":   err,
		})
	} else {
		c.JSON(200, gin.H{
			"message": "User Created Successfully",
			"user":    user,
		})
	}
}

//GetUserByID ... Get the user by id
func GetUserByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var user models.User
	err := models.GetUserByID(&user, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "No user with that ID",
		})
		// c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "User Found Successfully",
			"user":    user,
		})
	}
}

// Login ... Get the user with email and password
func Login(c *gin.Context) {
	email := c.Params.ByName("email")
	password := c.Params.ByName("password")
	var user models.User
	err := models.GetUserByLogin(&user, email, password)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Login not successful, please provide different credentials.",
		})
	} else {
		// todo: generate JWT after confirmed email and password match
		c.JSON(http.StatusOK, gin.H{
			"message": "Login Success",
			"user":    user,
		})
	}
}

//UpdateUser ... Update the user information
func UpdateUser(c *gin.Context) {
	var user models.User
	id := c.Params.ByName("id")
	err := models.GetUserByID(&user, id)
	if err != nil {
		c.JSON(http.StatusNotFound, user)
	}
	c.BindJSON(&user)
	err = models.UpdateUser(&user, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, user)
	}
}

//DeleteUser ... Delete the user
func DeleteUser(c *gin.Context) {
	var user models.User
	id := c.Params.ByName("id")
	err := models.DeleteUser(&user, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id: " + id: "is deleted"})
	}
}
