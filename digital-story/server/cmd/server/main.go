package main

import (
	"context"
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/acapy"
	"github.com/ealexandros/digital-story/uth/server/config"
	"github.com/ealexandros/digital-story/uth/server/server"
	"github.com/labstack/echo/v4"
	"go.uber.org/fx"
	"log"
)

func main() {
	app := fx.New(
		server.Module,
		acapy.Module,
		config.Module,
		fx.Invoke(func(e *echo.Echo, c config.Config) error {
			if err := e.Start(fmt.Sprintf(":%s", c.ServerPort)); err != nil {
				return err
			}

			return nil
		}),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
