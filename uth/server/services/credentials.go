package services

import (
	"errors"
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/entities"
	"github.com/flower-corp/lotusdb"
	"github.com/ldej/go-acapy-client"
	"gorm.io/gorm"
	"time"
)

type Credentials struct {
	acapy *acapy.Client
	lotus *lotusdb.LotusDB
	gorm  *gorm.DB
}

func (s *Credentials) IssueDegree(connID string) error {
	credDefID, err := s.lotus.Get([]byte("student_degree_cred_def_id"))
	if err != nil {
		return err
	}

	if credDefID == nil {
		return errors.New("error credential id not found")
	}

	var user entities.User
	if err := s.gorm.Where("connection_id = ?", connID).First(&user).Error; err != nil {
		return err
	}

	name := "Alexandros Eleutheriadis"
	if user.Username == "john" {
		name = "Ioannis Kontopoulos"
	}

	res, err := s.acapy.IssueCredentialV2(connID, acapy.CredentialPreviewV2{
		Attributes: []acapy.CredentialPreviewAttributeV2{
			{
				Name:     "department",
				MimeType: "text/plain",
				Value:    "Computer Science",
			},
			{
				Name:     "name",
				MimeType: "text/plain",
				Value:    name,
			},
			{
				Name:     "graduation_date",
				MimeType: "text/plain",
				Value:    time.Now().String(),
			},
		},
	}, "comment", string(credDefID), "VeYnF5tidYy3kMR2F82UDL", "VeYnF5tidYy3kMR2F82UDL:2:student_degree:1.0")

	if err != nil {
		return err
	}
	fmt.Println(res)
	return nil
}

func NewCredentials(lotus *lotusdb.LotusDB, acapy *acapy.Client, gorm *gorm.DB) *Credentials {
	return &Credentials{
		acapy: acapy,
		lotus: lotus,
		gorm:  gorm,
	}
}
