package main

import (
	"context"
	"github.com/ealexandros/digital-story/uth/server/controllers"
	"github.com/ealexandros/digital-story/uth/server/db"
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"log"

	"github.com/ealexandros/digital-story/uth/server/server"
	"go.uber.org/fx"
)

func main() {
	app := fx.New(
		server.Module,
		db.Module,
		controllers.Module,
		services.Module,
		fx.Invoke(func(e *echo.Echo) error {
			if err := e.Start(":3000"); err != nil {
				return err
			}

			return nil
		}),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
