//import init from "@wasm-fmt/sql_fmt/vite";
import init from "#sqlformat_wasm";
import { use } from "react";

const initPromise = init();

export function Init() {
  use(initPromise);
  return null;
}
