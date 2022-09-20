package main

import (
	"context"
	"github.com/ealexandros/digital-story/uth/server/acapy"
	"github.com/ealexandros/digital-story/uth/server/config"
	acapy2 "github.com/ldej/go-acapy-client"
	"go.uber.org/fx"
	"log"
)

func main() {
	app := fx.New(
		acapy.Module,
		config.Module,
		fx.Invoke(func(client *acapy2.Client) error {
			cc, err := client.QueryConnections(nil)
			if err != nil {
				return err
			}

			for _, c := range cc {
				if err := client.RemoveConnection(c.ConnectionID); err != nil {
					return err
				}
			}
			return nil
		}),
	)

	if err := app.Start(context.Background()); err != nil {
		log.Fatal(err)
	}
}
