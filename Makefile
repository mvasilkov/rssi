jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
browserify = node_modules/.bin/browserify
bower = node_modules/.bin/bower
npm = npm

all: node_modules jshint mocha assert.js bower_components

node_modules: package.json
	@ $(npm) install

jshint: node_modules
	@ $(jshint) rssi.js test/*.js

mocha: node_modules
	@ $(mocha) -R spec

assert.js: node_modules
	@ $(browserify) -r assert -s assert -o assert.js

bower_components: node_modules bower.json
	@ $(bower) install
