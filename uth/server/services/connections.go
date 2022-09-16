package services

import (
	"github.com/ealexandros/digital-story/uth/server/entities"
	"github.com/ldej/go-acapy-client"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

const (
	ConnectionStateInactive = "inactive"
	ConnectionStateActive   = "active"
)

type Connections struct {
	db    *gorm.DB
	acapy *acapy.Client
}

func (s *Connections) CreateInvitation(username string) (string, error) {
	var user entities.User
	if err := s.db.Where("username = ?", username).First(&user).Error; err != nil {
		return "", ErrNotFound
	}

	// user has already generated an invitation url
	if user.ConnectionID != "" {
		return user.InvURL, nil
	}

	// Create inv url and store it
	resp, err := s.acapy.CreateInvitation(username, true, false, false)
	if err != nil {
		return "", err
	}

	user.InvURL = resp.InvitationURL
	user.ConnectionID = resp.ConnectionID
	user.ConnectionState = ConnectionStateInactive

	if err := s.db.Save(&user).Error; err != nil {
		acapyerr := s.acapy.RemoveConnection(resp.ConnectionID)
		if acapyerr != nil {
			return "", errors.Wrap(err, acapyerr.Error())
		}

		return "", acapyerr
	}

	return user.InvURL, nil
}

func (s *Connections) GetConnections() ([]Connection, error) {
	conn, err := s.acapy.QueryConnections(nil)
	if err != nil {
		return nil, err
	}

	var conns []string
	for _, c := range conn {
		conns = append(conns, c.ConnectionID)
	}

	var users []entities.User
	if err := s.db.Where("connection_id IN ?", conns).Find(&users).Error; err != nil {
		return nil, err
	}

	var resp []Connection
	for _, u := range users {
		resp = append(resp, Connection{
			Username:     u.Username,
			ConnectionID: u.ConnectionID,
			Active:       u.ConnectionState == ConnectionStateActive,
		})
	}

	return resp, nil
}

func (s *Connections) HandleWebhook(event acapy.Connection) {
	switch event.State {
	case "response":
		s.db.
			Model(&entities.User{}).
			Where("connection_id = ?", event.ConnectionID).
			Update("connection_state", ConnectionStateActive)
	}
}

func NewConnections(db *gorm.DB, acapy *acapy.Client) *Connections {
	return &Connections{db: db, acapy: acapy}
}
