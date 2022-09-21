package services

import (
	"encoding/base64"
	"encoding/json"
	"github.com/ldej/go-acapy-client"
	"github.com/pkg/errors"
	"net/url"
)

type Connections struct {
	a *acapy.Client
}

func (s Connections) CreateInvitation() (string, error) {
	// TODO is this my alias or the invitee's one?
	resp, err := s.a.CreateInvitation("", true, false, false)

	return resp.InvitationURL, err
}

func (s Connections) ReceiveInvitation(invURL string) error {
	inviation, err := s.parseInvUrl(invURL)
	if err != nil {
		return err
	}

	_, err = s.a.ReceiveInvitation(inviation, true)

	return err
}

func (s Connections) GetConnections(activeOnly bool) ([]Connection, error) {
	if activeOnly {
		return s.getConnections(func(connection acapy.Connection) bool {
			return connection.State != "response"
		})
	}

	return s.getConnections()
}

func (s Connections) GetActiveConnections() ([]Connection, error) {
	return s.getConnections(func(connection acapy.Connection) bool {
		return connection.State != "response"
	})
}

func (s Connections) getConnections(skippers ...func(connection acapy.Connection) bool) ([]Connection, error) {
	cc, err := s.a.QueryConnections(nil)
	if err != nil {
		return nil, err
	}

	response := make([]Connection, 0)
	for _, c := range cc {
		if s.shouldSkipConnection(c, skippers) {
			continue
		}

		response = append(response, Connection{
			Alias:        c.TheirLabel,
			ConnectionID: c.ConnectionID,
			Active:       c.State == "active",
		})
	}

	return response, nil
}

func (s Connections) shouldSkipConnection(conn acapy.Connection, skippers []func(acapy.Connection) bool) bool {
	for _, s := range skippers {
		if s(conn) {
			return true
		}
	}

	return false
}

func (s Connections) parseInvUrl(invURL string) (acapy.Invitation, error) {
	u, err := url.Parse(invURL)
	if err != nil {
		return acapy.Invitation{}, err
	}

	encodedInv := u.Query().Get("c_i")
	if encodedInv == "" {
		return acapy.Invitation{}, errors.New("missing inv query parameter")
	}

	decodedInv, err := base64.StdEncoding.DecodeString(encodedInv)

	var res acapy.Invitation
	if err := json.Unmarshal(decodedInv, &res); err != nil {
		return acapy.Invitation{}, err
	}

	return res, nil
}

func NewConnections(a *acapy.Client) *Connections {
	return &Connections{a: a}
}
