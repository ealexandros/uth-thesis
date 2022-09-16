To run each agent use:
`docker-compose --env-file ./.env.{name} up`
where {name} is either john or acme.

To run the agent you must provide the agent name as command line argument (so that the correct env can be loaded). E.x:
`go run cmd/server/main.go john`
