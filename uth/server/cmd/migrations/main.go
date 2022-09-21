package main

import (
	"context"
	"github.com/ealexandros/digital-story/uth/server/config"
	"github.com/ealexandros/digital-story/uth/server/db"
	"github.com/ealexandros/digital-story/uth/server/entities"
	"go.uber.org/fx"
	"gorm.io/gorm"
	"log"
)

func migrate(db *gorm.DB) error {
	if err := db.Migrator().DropTable(&entities.User{}); err != nil {
		return err
	}
	return db.AutoMigrate(
		&entities.User{},
	)
}

func main() {
	app := fx.New(
		db.Module,
		config.Module,
		fx.Invoke(migrate),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
