extern crate cfg_if;
extern crate wasm_bindgen;
extern crate rand;
extern crate sudokugen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use sudokugen::generator::Generator;
use sudokugen::generator::random_gen::*;
use sudokugen::solver::least_options::LeastOptionsSolver;
use sudokugen::solver::Solver;
use std::convert::From;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, sudokuweb!");
}

#[wasm_bindgen]
pub fn get_puzzle() -> Vec<u8> {
    let solver = LeastOptionsSolver::new();
    let mut gen = RandGenSudoku::new(Box::new(solver));
    let puzzle = gen.generate().unwrap();
    let mut result: Vec<u8> = Vec::with_capacity(81);
    result.extend(puzzle.board.values.iter());
    result
}
