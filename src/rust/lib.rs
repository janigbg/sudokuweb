extern crate cfg_if;
extern crate log;
extern crate wasm_bindgen;
extern crate sudokugen;

mod utils;
mod logger;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

use log::LevelFilter;
use std::convert::From;
use std::sync::Once;
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

static LOGGER: logger::SimpleLogger = logger::SimpleLogger;
static START: Once = Once::new();

#[wasm_bindgen]
pub fn init() {
    START.call_once(|| {
        log::set_logger(&LOGGER)
            .map(|()| log::set_max_level(LevelFilter::Debug))
            .unwrap();
    });
}

#[wasm_bindgen]
pub fn get_puzzle(seed: u32, diff: u32) -> Result<Vec<u8>, JsValue> {
    init();
    let difficulty = Difficulty::from(diff);
    let solver = LeastOptionsSolver::new();
    let mut generator = RandomSudoku::new(solver)
        .seed(seed)
        .difficulty(difficulty);
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
