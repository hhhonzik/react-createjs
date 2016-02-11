

build: test
	@mkdir -p ./dist
	@./node_modules/.bin/babel ./lib/ -o ./dist/react-createjs.js

dev:
	@node ./webpack/devServer

test:
	@./node_modules/.bin/eslint ./lib/ ./examples/
