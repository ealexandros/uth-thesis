package controllers

import (
	"errors"
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterConnections(e *echo.Echo, service *services.Connections) {
	r := connections{service: service}
	e.POST("/connections/invitation", r.createInvitation)
	e.GET("/admin/connections", r.getConnections)
}

type connections struct {
	service *services.Connections
}

func (r connections) getConnections(c echo.Context) error {
	resp, err := r.service.GetConnections()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	return c.JSON(http.StatusOK, resp)
}

func (r connections) createInvitation(c echo.Context) error {
	user := c.Get("username").(string)

	invUrl, err := r.service.CreateInvitation(user)
	if err != nil {
		if errors.Is(err, services.ErrNotFound) {
			return echo.NewHTTPError(http.StatusNotFound)
		}

		return echo.NewHTTPError(http.StatusInternalServerError).SetInternal(err)
	}

	response := struct {
		InvitationURL string `json:"invitationUrl"`
	}{invUrl}

	return c.JSON(http.StatusOK, response)
}
