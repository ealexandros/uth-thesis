package controllers

import (
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterCredentails(e *echo.Echo, s *services.Credentials) {
	r := credentials{
		service: s,
	}

	e.POST("/credentials/degree/:connID", r.issueDegree)
}

type credentials struct {
	service *services.Credentials
}

func (r credentials) issueDegree(c echo.Context) error {
	connID := c.Param("connID")
	if err := r.service.IssueDegree(connID); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}
	return nil
}
