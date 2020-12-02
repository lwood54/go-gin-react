package config

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

// DB defined and made accessible outside of package
var DB *gorm.DB

// DBConfig represents db configuration
type DBConfig struct {
	Host     string
	Port     int
	User     string
	DBName   string
	Password string
}

// BuildDBConfig with defaults, return pointer to DBConfig
func BuildDBConfig() *DBConfig {
	dbConfig := DBConfig{
		Host:     "localhost",
		Port:     3306,
		User:     "logan",
		Password: "test_password",
		DBName:   "fs_go_db",
	}
	return &dbConfig
}

// DbURL will return a formatted string of the db url
func DbURL(dbConfig *DBConfig) string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local",
		dbConfig.User,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.DBName,
	)
}
