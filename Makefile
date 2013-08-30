jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
browserify = node_modules/.bin/browserify
bower = node_modules/.bin/bower
npm = npm
git = git

all: jshint mocha test_client/assert.js bower_components

node_modules: package.json
	@ $(npm) install

jshint: node_modules
	@ $(jshint) rssi.js test/*.js usage/*.js

mocha: node_modules
	@ $(mocha) -R spec

test_client/assert.js: node_modules
	@ $(browserify) -r assert -s assert -o $@

bower_components: node_modules bower.json
	@ $(bower) install

clean:
	@ $(git) clean -dfx
