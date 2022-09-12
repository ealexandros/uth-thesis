package acapy

import (
	"github.com/ldej/go-acapy-client"
	"go.uber.org/fx"
)

var Module = fx.Provide(
	New,
)

func New() *acapy.Client {
	return acapy.NewClient("http://localhost:8010")
}
