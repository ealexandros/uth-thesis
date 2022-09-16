package acapy

import (
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/config"
	"github.com/ldej/go-acapy-client"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(New),
)

func New(c config.Config) *acapy.Client {
	a := acapy.NewClient(fmt.Sprintf("http://%s:%s", c.AcapyAdminHost, c.AcapyAdminPort))
	return a
}
