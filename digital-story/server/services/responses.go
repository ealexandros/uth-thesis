package services

type Connection struct {
	Alias        string `json:"alias"`
	ConnectionID string `json:"connection_id"`
	Active       bool   `json:"active,omitempty"`
}

type Credential struct {
	Attributes map[string]string `json:"attrs"`
}

type PresentationRecord struct {
	State          string            `json:"state"`
	Role           string            `json:"role"`
	Label          string            `json:"label"`
	PresExchangeID string            `json:"presentation_exchange_id"`
	ErrMsg         string            `json:"error_message,omitempty"`
	RevAttrs       map[string]string `json:"revealed_attrs"`
	ReqAttrs       []string          `json:"requested_attrs"`
}
