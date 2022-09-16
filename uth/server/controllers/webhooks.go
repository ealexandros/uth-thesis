package controllers

import (
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/services"
	"github.com/labstack/echo/v4"
	"github.com/ldej/go-acapy-client"
	"net/http"
)

type WebHookHandler struct {
	connections *services.Connections
}

func (h WebHookHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	webhookHandler := acapy.CreateWebhooksHandler(acapy.WebhookHandlers{
		ConnectionsEventHandler: h.connections.HandleWebhook,

		BasicMessagesEventHandler: nil,
		ProblemReportEventHandler: func(event acapy.ProblemReportEvent) {
			fmt.Println(event)
		},
		CredentialExchangeEventHandler:     nil,
		CredentialExchangeV2EventHandler:   nil,
		CredentialExchangeDIFEventHandler:  nil,
		CredentialExchangeIndyEventHandler: nil,
		RevocationRegistryEventHandler:     nil,
		PresentationExchangeEventHandler:   nil,
		CredentialRevocationEventHandler:   nil,
		PingEventHandler:                   nil,
		OutOfBandEventHandler:              nil,
	})

	webhookHandler(writer, request)
}

func RegisterWebHooks(e *echo.Echo, connections *services.Connections) {
	handler := WebHookHandler{connections: connections}
	echoHandler := echo.WrapHandler(handler)

	e.POST("/webhooks/topic/:topic", echoHandler)
}
