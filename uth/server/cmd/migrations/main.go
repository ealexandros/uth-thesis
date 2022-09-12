package main

import (
	"context"
	"github.com/ealexandros/digital-story/uth/server/db"
	"github.com/ealexandros/digital-story/uth/server/entities"
	"go.uber.org/fx"
	"gorm.io/gorm"
	"log"
)

func migrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&entities.User{},
		&entities.Session{},
	)
}

func main() {
	app := fx.New(
		db.Module,
		fx.Invoke(migrate),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
