package controllers

import (
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterCredentials(e *echo.Echo, service *services.Credentials) {
	r := credentials{
		service: service,
	}

	e.GET("/credentials", r.getCredentials)
}

func (r credentials) getCredentials(c echo.Context) error {
	cc, err := r.service.GetIssuedCredentials()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	return c.JSON(http.StatusOK, cc)
}

type credentials struct {
	service *services.Credentials
}

