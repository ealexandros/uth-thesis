package main

import (
	"context"
	"github.com/ealexandros/digital-story/uth/server/db"
	"github.com/ealexandros/digital-story/uth/server/entities"
	"go.uber.org/fx"
	"gorm.io/gorm"
	"log"
)

func addUserFixtures(db *gorm.DB) {
	john := entities.User{Username: "john"}
	alex := entities.User{Username: "alex"}

	db.Save(&john)
	db.Save(&alex)
}

func main() {
	app := fx.New(
		db.Module,
		fx.Invoke(addUserFixtures),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
