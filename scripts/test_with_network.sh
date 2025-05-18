#!/usr/bin/env bash

source $(dirname "${BASH_SOURCE[0]}")/set_vars.sh

# Public: Runs tests against a private avm network node running on http://127.0.0.1.
#
# $1 - The name of the package, i.e. @kibisis/assets.
#
# Examples
#
#   ./test_with_anvil.sh "@kibisis/assets"
#
# Returns with exit code 1 if the tests fail or not package was supplied, otherwise exit code 0 is returned.
function main {
  local attempt
  local algod_container_name
  local algod_health
  local exit_code
  local indexer_container_name
  local indexer_health

  attempt=0
  exit_code=0
  health=starting

  set_vars

  if [ -z "${1}" ]; then
    printf "%b no package specified, use: ./test_with_anvil.sh [package] \n" "${ERROR_PREFIX}"
    exit 1
  fi

  docker compose up \
    --build \
    -d

  algod_container_name=kibisistoolkit_algod
  indexer_container_name=kibisistoolkit_indexer

  while [ ${attempt} -le 29 ]; do
    sleep 2

    attempt=$((attempt + 1))

    printf "%b waiting for healthcheck (algod: %b, indexer: %b), attempt: %b...\n" \
          "${INFO_PREFIX}" "${algod_health}" "${indexer_health}" "${attempt}"

    algod_health=$(docker inspect -f "{{.State.Health.Status}}" "${algod_container_name}")
    indexer_health=$(docker inspect -f "{{.State.Health.Status}}" "${indexer_container_name}")

    # break if both are no longer "starting" (i.e., both are "healthy" or "unhealthy")
    if [[ ("${algod_health}" == "healthy" || "${algod_health}" == "unhealthy") && \
          ("${indexer_health}" == "healthy" || "${indexer_health}" == "unhealthy") ]]; then
      break
    fi
  done

  # if both algod and indexer are up and running, run tests
  if [[ "${algod_health}" == "healthy" && "${indexer_health}" == "healthy" ]]; then
    pnpm -F "${1}" run test
    exit_code=$?
  else
    docker logs --details "${algod_container_name}"
    docker logs --details "${indexer_container_name}"
    exit_code=1
  fi

  # stop the services and remove
  docker compose down

  exit ${exit_code}
}

# and so, it begins...
main "$@"
