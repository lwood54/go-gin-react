package models

// User setting User model structure
type User struct {
	ID        uint   `json:"id"`
	LastName  string `json:"lastName"`
	FirstName string `json:"firstName"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Password  string `json:"password"`
}

// TableName setting DB table name
func (b *User) TableName() string {
	return "user"
}
