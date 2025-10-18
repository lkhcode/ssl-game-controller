CMDS = ssl-game-controller ssl-ref-client
DOCKER_TARGETS = $(addprefix docker-, $(CMDS))
.PHONY: all docker frontend install test run proto $(DOCKER_TARGETS) build

# 检测操作系统
ifeq ($(OS),Windows_NT)
    # Windows
    TOUCH = type nul >
    RM = del /F /Q
    FRONTEND_FILES = frontend/package.json frontend/package-lock.json
    EXE_EXT = .exe
    GOOS = windows
    GOARCH = amd64
else
    # Linux/Unix
    TOUCH = touch
    RM = rm -f
    FRONTEND_FILES = $(shell find frontend/ -type f -not -path "frontend/node_modules/*")
    EXE_EXT = 
    GOOS = $(shell go env GOOS)
    GOARCH = $(shell go env GOARCH)
endif

all: install docker

docker: $(DOCKER_TARGETS)

$(DOCKER_TARGETS): docker-%:
	docker build -f ./cmd/$*/Dockerfile -t $*:latest .

.frontend: $(FRONTEND_FILES)
	cd frontend && \
	npm install && \
	npm run build
	$(TOUCH) .frontend

frontend: .frontend

install: frontend
	go install -v ./...

test: frontend
	go test ./...

run: frontend
	go run ./cmd/$(word 1,$(CMDS))

dev:
	cd frontend && npm run dev

proto:
	buf generate

autoref-tests:
	git clone "https://gitlab.com/robocup-small-size/autoref-tests.git" autoref-tests

update-backend:
	go get -v -u all

update-frontend:
	cd frontend && \
	npm update --save

update: update-backend update-frontend proto

build: frontend
ifeq ($(OS),Windows_NT)
	go env -w GOOS=windows
	go env -w GOARCH=amd64
	go build -o ./bin/ssl-game-controller$(EXE_EXT) ./cmd/ssl-game-controller
else
	GOOS=$(GOOS) GOARCH=$(GOARCH) go build -o ./bin/ssl-game-controller$(EXE_EXT) ./cmd/ssl-game-controller
endif