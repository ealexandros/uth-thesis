package services

type Connection struct {
	Alias        string `json:"alias"`
	ConnectionID string `json:"connection_id"`
	Active       bool   `json:"active,omitempty"`
}
