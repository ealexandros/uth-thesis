package entities

type User struct {
	ID              int    `gorm:"primaryKey"`
	Username        string `gorm:"connection_id"`
	ConnectionID    string `gorm:"connection_id"`
	InvURL          string `gorm:"inv_url"`
	ConnectionState string `gorm:"conn_state"`
}
