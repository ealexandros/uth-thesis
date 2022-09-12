package entities

type Session struct {
	ID           int    `gorm:"primaryKey"`
	ConnectionID string `gorm:"connection_id"`
	State        string `gorm:"state"`
}
