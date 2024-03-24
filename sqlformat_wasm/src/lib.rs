use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn format(code: &str) -> String {
    sqlformat::format(code, &sqlformat::QueryParams::None, Default::default())
}
