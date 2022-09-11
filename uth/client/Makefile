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
	docker exec -it uth-client-dev-container /bin/sh

prod:
	docker stop uth-client-prod-container || true 
	docker build -f Dockerfile.prod -t uth-prod-client .
	docker run --rm -d -p 3000:3000 --name uth-client-prod-container uth-prod-client

stop:
	docker stop uth-client-prod-container || true 	
	docker stop uth-client-dev-container || true 