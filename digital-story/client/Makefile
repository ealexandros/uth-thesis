help:
	@printf "\nCommands available:\n\n"

	@printf "prod\t\t Deploys a docker for development.\n"

	@printf "dev\t\t Deploys a docker for development.\n"
	@printf "dev-tty\t\t Connects to the docker container.\n"
	@printf "stop\t\t Stop every docker container.\n"

	@printf "\n"

dev:
	docker-compose -f ./docker-compose.dev.yml up -d

dev-tty:
	docker exec -it digital-story-dev-container /bin/sh

prod:
	docker stop digital-story-john-container || true 
	docker stop digital-story-acme-container || true 
	docker-compose -f ./docker-compose.prod.yml up -d

stop:
	docker stop digital-story-john-container || true 
	docker stop digital-story-acme-container || true 
	docker stop digital-story-dev-container || true 