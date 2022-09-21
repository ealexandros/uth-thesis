package controllers

import (
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterConnections(e *echo.Echo, service *services.Connections) {
	r := connections{service: service}

	e.POST("/connections/invitation", r.createInvitation)
	e.POST("/connection/invitation/receive", r.receiveInvitation)
	e.GET("/connections", r.getConnections)
}

type connections struct {
	service *services.Connections
}

func (r connections) createInvitation(c echo.Context) error {
	invURL, err := r.service.CreateInvitation()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	response := struct {
		InvURL string `json:"inv_url"`
	}{InvURL: invURL}

	return c.JSON(http.StatusOK, response)
}

func (r connections) receiveInvitation(c echo.Context) error {
	var request struct {
		InvURL string `json:"inv_url"`
	}
	if err := c.Bind(&request); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error()).SetInternal(err)
	}

	if err := r.service.ReceiveInvitation(request.InvURL); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error()).SetInternal(err)
	}

	return c.NoContent(http.StatusOK)
}

func (r connections) getConnections(c echo.Context) error {
	active := c.QueryParam("active")

	cc, err := r.service.GetConnections(active != "")
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	return c.JSON(http.StatusOK, cc)
}
