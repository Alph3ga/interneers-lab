.PHONY: setup test

dev:
	docker compose up -d
	. ./venv/bin/activate && ./manage.py runserver 8080

seed:
	. ./venv/bin/activate && ./seed.py

test:
	docker compose up -d
	. ./venv/bin/activate && pytest

down:
	docker compose down