#!/usr/bin/env bash

set -a
[ -f .env ] && . .env
set +a

flywayBaseline() {
    docker run --rm --network host \
        -v "$(pwd)/flyway:/flyway/sql" \
        flyway/flyway:10.0.1-alpine baseline -url=jdbc:postgresql://$PRV_PG_HOST:$PRV_PG_PORT/$PRV_PG_DB_NAME?ApplicationName=svtblog_flyway -user=$PRV_PG_USER_NAME -password=$PRV_PG_PASS -locations=filesystem:/flyway/sql
}

flywayMigrate() {
    docker run --rm --network host \
        -v "$(pwd)/flyway:/flyway/sql" \
        flyway/flyway:10.0.1-alpine migrate -url=jdbc:postgresql://$PRV_PG_HOST:$PRV_PG_PORT/$PRV_PG_DB_NAME?ApplicationName=svtblog_flyway -user=$PRV_PG_USER_NAME -password=$PRV_PG_PASS -locations=filesystem:/flyway/sql
}

flywayInfo() {
    docker run --rm --network host \
        -v "$(pwd)/flyway:/flyway/sql" \
        flyway/flyway:10.0.1-alpine info -url=jdbc:postgresql://$PRV_PG_HOST:$PRV_PG_PORT/$PRV_PG_DB_NAME?ApplicationName=svtblog_flyway -user=$PRV_PG_USER_NAME -password=$PRV_PG_PASS -locations=filesystem:/flyway/sql
}

if [[ $# -eq 0 ]] ; then
    echo 'Please provide one of the arguments (e.g., bash shell/migrate.sh info):
    1 > info
    2 > baseline
    3 > migrate'

elif [[ $1 == info ]]; then
    flywayInfo

elif [[ $1 == baseline ]]; then
    flywayBaseline

elif [[ $1 == migrate ]]; then
    flywayMigrate

fi

# Clean the env variables
unset $(grep -v '^#' .env | sed -E 's/(.*)=.*/\1/' | xargs)
