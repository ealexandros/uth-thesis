package services

import "github.com/ldej/go-acapy-client"

type Credentials struct {
	a *acapy.Client
}

func (s *Credentials) GetIssuedCredentials() ([]Credential, error) {
	creds, err := s.a.GetCredentials(10, 0, "")
	if err != nil {
		return nil, err
	}

	var res []Credential
	for _, c := range creds {
		res = append(res, Credential{
			Attributes: c.Attributes,
		})
	}

	return res, nil
}

func NewCredentials(a *acapy.Client) *Credentials {
	return &Credentials{a: a}
}
