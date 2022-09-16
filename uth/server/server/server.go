package server

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/fx"
)

func DummyAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if c.Request().Method == http.MethodOptions {
			return next(c)
		}
		if c.Request().URL.String() == "/login" ||
			strings.HasPrefix(c.Request().URL.String(), "/webhooks/topic") ||
			strings.HasPrefix(c.Request().URL.String(), "/admin") {
			return next(c)
		}

		username := c.Request().Header.Get("username")
		if username == "john" || username == "alex" {
			c.Set("username", username)
			return next(c)
		}

		return echo.NewHTTPError(http.StatusUnauthorized)
	}
}

var Module = fx.Provide(
	NewEcho,
)

func NewEcho() *echo.Echo {
	e := echo.New()
	
	e.Use(middleware.CORS())
	e.Use(DummyAuth)

	return e
}
