jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
npm = npm

all: node_modules jshint mocha

node_modules: package.json
	@ $(npm) install

jshint:
	@ $(jshint) rssi.js test/*.js

mocha:
	@ $(mocha) -R spec
