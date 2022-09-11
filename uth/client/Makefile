help:
	@printf "\nCommands available:\n\n"

	@printf "prod\t\t Deploys a docker for development.\n"

	@printf "dev\t\t Deploys a docker for development.\n"
	@printf "dev-tty\t\t Connects to the docker container.\n"
	@printf "\n"

run dev:
	docker-compose -f ./docker-compose.dev.yml up

run dev-tty:
	docker exec -it uth-client-dev-container /bin/sh

run prod:
	docker rm 
	docker build -f Dockerfile.prod -t uth-client
	docker run -p 3000:3000 --name uth-client-container uth-client
