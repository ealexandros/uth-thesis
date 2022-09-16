package config

import (
	"github.com/caarlos0/env/v6"
	"github.com/joho/godotenv"
	"go.uber.org/fx"
)

var Module = fx.Provide(
	NewConfig,
)

type Config struct {
	AcapyAdminHost string `env:"ACAPY_AGENT_HOST"`
	AcapyAdminPort string `env:"ACAPY_ADMIN_PORT"`

	ServerPort string `env:"SERVER_PORT"`

	PostgresHost     string `env:"POSTGRES_HOST"`
	PostgresPort     string `env:"POSTGRES_PORT"`
	PostgresUser     string `env:"POSTGRES_USER"`
	PostgresPassword string `env:"POSTGRES_PASSWORD"`
	PostgresDB       string `env:"POSTGRES_DATABASE"`
}

func NewConfig() (Config, error) {
	if err := godotenv.Load(); err != nil {
		return Config{}, err
	}

	cfg := Config{}
	if err := env.Parse(&cfg); err != nil {
		return cfg, err
	}
	return cfg, nil
}
