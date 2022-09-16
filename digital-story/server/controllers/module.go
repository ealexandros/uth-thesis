package controllers

import "go.uber.org/fx"

var Module = fx.Invoke(
	RegisterConnections,
	RegisterWebHooks,
)
