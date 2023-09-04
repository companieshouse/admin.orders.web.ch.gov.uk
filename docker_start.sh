#!/bin/bash
npm i
PORT=3000
export NODE_PORT=${PORT}
ls -al /opt
exec node /opt/dist/bin/www.js -- ${PORT}
