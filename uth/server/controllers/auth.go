package controllers

import (
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterAuth(e *echo.Echo, service *services.Auth) {
	r := auth{service: service}

	e.POST("/login", r.login)
}

type auth struct {
	service *services.Auth
}

func (r auth) login(c echo.Context) error {
	var request struct {
		Username string `json:"username"`
	}

	if err := c.Bind(&request); err != nil {
		return err
	}

	if err := r.service.Login(request.Username); err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	return c.NoContent(http.StatusOK)
}
