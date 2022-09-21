package services

import "go.uber.org/fx"

var Module = fx.Provide(
	NewConnections,
	NewCredentials,
	NewPresentations,
)
