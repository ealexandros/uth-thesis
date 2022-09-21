package services

import (
	"errors"
	"github.com/ealexandros/digital-story/uth/server/entities"
	"gorm.io/gorm"
)

type Auth struct {
	db *gorm.DB
}

func (s *Auth) Login(username string) error {
	var user entities.User
	if err := s.db.Where("username = ?", username).First(&user).Error; err != nil {
		return errors.New("user not found")
	}

	return nil
}

func NewAuth(db *gorm.DB) *Auth {
	return &Auth{db: db}
}
