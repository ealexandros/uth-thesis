package services

import (
	"github.com/ealexandros/digital-story/uth/server/entities"
	"github.com/ldej/go-acapy-client"
	"github.com/pkg/errors"
	"gorm.io/gorm"
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

	resp, err := s.acapy.CreateInvitation(username, true, false, false)
	if err != nil {
		return "", err
	}

	session := entities.Session{
		ConnectionID: resp.ConnectionID,
		State:        "invite-created",
	}

	user.ConnectionID = session.ConnectionID
	if err := s.db.Save(&user).Error; err != nil {
		acapyerr := s.acapy.RemoveConnection(resp.ConnectionID)
		if acapyerr != nil {
			return "", errors.Wrap(err, acapyerr.Error())
		}

		return "", acapyerr
	}

	if err := s.db.Save(&session).Error; err != nil {
		return "", err
	}

	return resp.InvitationURL, nil
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
		})
	}

	return resp, nil
}

func (s *Connections) HandleWebhook(event acapy.Connection) {
	switch event.RFC23State {
	case "response-sent":
		s.db.
			Model(&entities.Session{}).
			Where("connection_id = ?", event.ConnectionID).
			Update("state", event.RFC23State)
	}
}

func NewConnections(db *gorm.DB, acapy *acapy.Client) *Connections {
	return &Connections{db: db, acapy: acapy}
}
