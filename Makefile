jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
browserify = node_modules/.bin/browserify
bower = node_modules/.bin/bower
npm = npm

all: node_modules jshint mocha browserify bower

node_modules: package.json
	@ $(npm) install

jshint: node_modules
	@ $(jshint) rssi.js test/*.js

mocha: node_modules
	@ $(mocha) -R spec

browserify: node_modules
	@ $(browserify) -r assert -s assert -o test_client/assert.js

bower: node_modules
	@ $(bower) install
