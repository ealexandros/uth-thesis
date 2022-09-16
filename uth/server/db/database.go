package db

import (
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewPostgres(c config.Config) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		c.PostgresHost,
		c.PostgresUser,
		c.PostgresPassword,
		c.PostgresDB,
		c.PostgresPort,
	)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	return db, err
}
