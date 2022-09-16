package services

type Connection struct {
	Username     string `json:"username"`
	ConnectionID string `json:"connection_id"`
	Active       bool   `json:"active"`
}
