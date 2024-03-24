#!/usr/bin/env bash
set -o errexit -o errtrace -o pipefail -o nounset

cd "$(dirname "$0")"

function count(){
	inp="$1"
	tmp="tmp.wasm"
	stat "$inp" | rg "^Change"
	wasm-tools strip "$inp" > "$tmp"
	wasm-tools print "$tmp" | wc -l
}

count ./target/wasm32-unknown-unknown/debug/sqlformat_wasm.wasm
count ./target/wasm32-unknown-unknown/release/sqlformat_wasm.wasm

# moldがwasmをサポートしてない。rustflagsをunsetする必要がある
