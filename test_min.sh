#!/bin/bash
mv rssi.js _rssi.js
ln -s rssi.min.js rssi.js
make mocha
result=$?
mv _rssi.js rssi.js
exit $result
