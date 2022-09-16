module github.com/ealexandros/digital-story/uth/server

go 1.18

require (
	github.com/caarlos0/env/v6 v6.10.1
	github.com/joho/godotenv v1.4.0
	github.com/labstack/echo/v4 v4.9.0
	github.com/ldej/go-acapy-client v0.0.0-20210607085110-82da231a9f74
	github.com/pkg/errors v0.8.1
	github.com/stretchr/testify v1.7.1
	go.uber.org/fx v1.18.1
)

require (
	github.com/davecgh/go-spew v1.1.1 // indirect
	github.com/pmezard/go-difflib v1.0.0 // indirect
	golang.org/x/tools v0.0.0-20200103221440-774c71fcf114 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

require (
	github.com/golang-jwt/jwt v3.2.2+incompatible // indirect
	github.com/labstack/gommon v0.3.1 // indirect
	github.com/mattn/go-colorable v0.1.11 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/valyala/bytebufferpool v1.0.0 // indirect
	github.com/valyala/fasttemplate v1.2.1 // indirect
	go.uber.org/atomic v1.6.0 // indirect
	go.uber.org/dig v1.15.0 // indirect
	go.uber.org/multierr v1.5.0 // indirect
	go.uber.org/zap v1.16.0 // indirect
	golang.org/x/crypto v0.0.0-20210921155107-089bfa567519 // indirect
	golang.org/x/net v0.0.0-20211015210444-4f30a5c0130f // indirect
	golang.org/x/sys v0.0.0-20211210111614-af8b64212486 // indirect
	golang.org/x/text v0.3.7 // indirect
	golang.org/x/time v0.0.0-20201208040808-7e3f01d25324 // indirect
)

replace go.etcd.io/bbolt => github.com/flower-corp/bbolt v1.3.7-0.20220315040627-32fed02add8f

replace github.com/ldej/go-acapy-client => github.com/koioannis/go-acapy-client v0.0.0-20220916131627-aaadaf470b3a
