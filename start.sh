#!/bin/bash
jq -c '.UI_ENVIRONMENT = $newVal' --arg newVal $UI_ENVIRONMENT /usr/share/nginx/html/config.json > tmp.$$.json && mv tmp.$$.json /usr/share/nginx/html/config.json
nginx -g "daemon off;"