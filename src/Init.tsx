import { use } from "react";
import init from "#sqlformat_wasm";

const initPromise = init();

export function Init() {
  use(initPromise);
  return null;
}
