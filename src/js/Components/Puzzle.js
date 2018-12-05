import React, {Component} from "react";
import {StyledButton, StyledContainer, StyledHeader, StyledHero} from "./Styled";
import { Board } from "./Board";

const diffs = ["easy", "medium", "hard", "evil"];

export class Puzzle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            done: false,
            board: [],
            clues: [],
            wasm: props.wasm,
            difficulty: props.diff || 0,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getRandomByte() {
        return Math.floor(Math.random() * Math.floor(256));
    }

    handleClick() {
        const seed = [...Array(4)]
            .map(_ => this.getRandomByte())
            .reduce((result, c, i) => result + c << (i * 8));

        const board = this.state.wasm.get_puzzle(seed, this.state.difficulty);
        const clues = board.map((v, _) => v > 0);
        this.setState({
            board,
            clues,
            done: false
        });
    }

    handleChange(e, cell) {
        const board = this.state.board;
        board[cell] = e.target.value || 0;
        let done = false;
        if (board.every((v, _) => v > 0)) {
            done = this.state.wasm.is_valid(board);
        }

        this.setState({
            board,
            done,
        });
    }

    render () {
        return (
            <div>
                <StyledHero>
                    <StyledHeader>Sudoku</StyledHeader>
                </StyledHero>
                <StyledContainer>               
                    <StyledButton onClick={this.handleClick}>Generate {diffs[this.state.difficulty || 0]} puzzle</StyledButton>
                    <Board
                        board={this.state.board}
                        clues={this.state.clues}
                        handleChange={this.handleChange} />
                     {this.state.done ? <div><p>{String.fromCodePoint(0x270C)}</p> You did it!!! Great work solving the puzzle!</div> : null }
                </StyledContainer>
            </div>
        );
    }
}
