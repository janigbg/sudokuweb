extern crate cfg_if;
extern crate wasm_bindgen;
extern crate sudokugen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use sudokugen::generator::{Difficulty, Generator};
use sudokugen::generator::random_gen::*;
use sudokugen::solver::least_options::LeastOptionsSolver;
use sudokugen::board::SudokuBoard;

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
pub fn get_puzzle(seed: u32) -> Result<Vec<u8>, JsValue> {
    let solver = LeastOptionsSolver::new();
    let mut generator = RandomSudoku::new(solver)
        .seed(seed)
        .difficulty(Difficulty::Easy);
    let puzzle = generator.run()?;
    let mut result: Vec<u8> = Vec::with_capacity(81);
    result.extend(puzzle.board.values.iter());
    Ok(result)
}

#[wasm_bindgen]
pub fn is_valid(vals: Vec<u8>) -> bool {
    let mut board = SudokuBoard::with_clues(&[]);
    vals.iter().enumerate().for_each(|(i, &v)| board.values[i] = v);
    board.is_valid()
}
