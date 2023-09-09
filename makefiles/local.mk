APP_DIR           = app
IMAGE_BUILD       = node:16.17.1-alpine3.16
FUNCTION          = base
UID_LOCAL        ?= $(shell id -u)
GID_LOCAL        ?= $(shell id -g)

install: ##@Global install dependencies
	@echo "Installing dependencies..."
	@yarn install --cwd ${APP_DIR}

