package controllers

import (
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"net/http"
)

func RegisterPresentations(e *echo.Echo, s *services.Presentations) {
	r := presentations{s: s}

	e.POST("/presentations/request", r.sendPresentationRequest)
	e.POST("/presentations/:pre_ex_id", r.sendPresentationProof)
	e.GET("/presentations", r.getPresentationRecords)
	e.DELETE("/presentations/:pre_ex_id", r.rejectPresentationRecord)
}

func (r presentations) sendPresentationProof(c echo.Context) error {
	preExID := c.Param("pre_ex_id")

	if err := r.s.SendPresentationProof(preExID); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	return c.NoContent(http.StatusOK)
}

func (r presentations) getPresentationRecords(c echo.Context) error {
	role := c.QueryParam("role")

	res, err := r.s.GetPresentationRecords(role)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error()).SetInternal(err)
	}

	return c.JSON(http.StatusOK, res)
}

func (r presentations) sendPresentationRequest(c echo.Context) error {
	var request struct {
		ConnID    string   `json:"conn_id"`
		SchemaID  string   `json:"schema_id"`
		IssuerDID string   `json:"issuer_did"`
		Attrs     []string `json:"attrs"`
	}

	if err := c.Bind(&request); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error()).SetInternal(err)
	}

	if err := r.s.SendPresentationRequest(request.ConnID, request.SchemaID, request.IssuerDID, request.Attrs); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error()).SetInternal(err)
	}

	return c.NoContent(http.StatusCreated)
}

func (r presentations) rejectPresentationRecord(c echo.Context) error {
	presRecID := c.Param("pre_ex_id")

	if err := r.s.RejectPresentationRecord(presRecID); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error()).SetInternal(err)
	}

	return c.NoContent(http.StatusOK)
}

type presentations struct {
	s *services.Presentations
}
