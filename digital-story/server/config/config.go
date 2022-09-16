package config

import (
	"fmt"
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"github.com/pkg/errors"
	"go.uber.org/fx"
	"os"
)

var Module = fx.Provide(
	NewConfig,
)

type Config struct {
	AcapyAdminHost string `env:"ACAPY_AGENT_HOST"`
	AcapyAdminPort string `env:"ACAPY_ADMIN_PORT"`

	ServerPort string `env:"SERVER_PORT"`
}

func NewConfig() (Config, error) {
	if len(os.Args) < 1 {
		return Config{}, errors.New("expected agent name argument")
	}
	agentName := os.Args[1]

	if err := godotenv.Load(fmt.Sprintf(".env.%s", agentName)); err != nil {
		return Config{}, err
	}

	cfg := Config{}
	if err := env.Parse(&cfg); err != nil {
		return cfg, err
	}
	return cfg, nil
}
