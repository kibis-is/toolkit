#!/usr/bin/env bash

source $(dirname "${BASH_SOURCE[0]}")/set_vars.sh

# Public: Runs tests against a local avm network node running on http://127.0.0.1.
#
# $1 - The name of the package, i.e. @kibisis/assets.
#
# Examples
#
#   ./test_with_network.sh "@kibisis/assets"
#
# Returns with exit code 1 if the tests fail or no package was supplied, otherwise exit code 0 is returned.
function main {
  local exit_code

  exit_code=0

  set_vars

  if [ -z "${1}" ]; then
    printf "%b no package specified, use: ./test_with_network.sh [package] \n" \
      "${ERROR_PREFIX}"
    exit 1
  fi

  printf "%b starting local avm network\n" \
      "${INFO_PREFIX}"

  # start a local avm network
  algokit localnet start

  printf "%b building dependencies\n" \
      "${INFO_PREFIX}"

  pnpm -F "${1}" build:dependencies

  printf "%b running tests\n" \
      "${INFO_PREFIX}"

  # run tests
  pnpm -F "${1}" test
  exit_code=$?

  printf "%b stopping local avm network\n" \
      "${INFO_PREFIX}"

  # stop the local avm network
  algokit localnet stop

  exit ${exit_code}
}

# and so, it begins...
main "$@"
