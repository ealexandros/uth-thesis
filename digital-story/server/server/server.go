package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/fx"
)

var Module = fx.Provide(
	NewEcho,
)

func NewEcho() *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORS())

	return e
}
