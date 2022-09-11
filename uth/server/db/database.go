package db

import (
	"go.uber.org/fx"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Module = fx.Provide(
	NewDB,
)

func NewDB() (*gorm.DB, error) {
	dsn := "host=localhost user=uth password=secret dbname=uth-ssi port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	return db, err
}
