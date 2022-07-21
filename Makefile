install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npm run lint

lint-fix:
	npm run lint-fix

sys-install:
	npm link

test:
	npm run test

test-watch:
	npm run test-watch

coverage:
	npm run coverage
