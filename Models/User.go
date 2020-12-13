package models

import (
	"fmt"

	"github.com/lwood54/fullstack_explore/config"

	// importing mysql
	_ "github.com/go-sql-driver/mysql"
)

//GetAllUsers Fetch all user data
func GetAllUsers(user *[]User) (err error) {
	if err = config.DB.Find(user).Error; err != nil {
		return err
	}
	return nil
}

//CreateUser ... Insert New data
func CreateUser(user *User) (err error) {
	if err = config.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

//GetUserByID ... Fetch only one user by Id
func GetUserByID(user *User, id string) (err error) {
	if err = config.DB.Where("id = ?", id).First(user).Error; err != nil {
		return err
	}
	return nil
}

// GetUserByLogin ... Fetch only one user by email and password
func GetUserByLogin(user *User, email string, password string) (err error) {
	fmt.Println("user before processing: ", user)
	if err = config.DB.Where("email = ?", email).Where("password = ?", password).First(user).Error; err != nil {
		return err
	}
	return nil
}

//UpdateUser ... Update user
func UpdateUser(user *User, id string) (err error) {
	fmt.Println("user: ", user)
	// Save() replaces entire object
	// config.DB.Save(user)
	// Model(user).Updates(user) will only save non-zero fields
	config.DB.Model(user).Updates(user)
	return nil
}

//DeleteUser ... Delete user
func DeleteUser(user *User, id string) (err error) {
	config.DB.Where("id = ?", id).Delete(user)
	return nil
}
