package entities

type User struct {
	ID       int `gorm:"primaryKey"`
	Username string
}
