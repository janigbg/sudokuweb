import React, {Component} from "react";
import {StyledButton, StyledContainer, StyledHeader, StyledHero} from "./Styled";
import { Board } from "./Board";

const diffs = ["easy", "medium", "hard", "evil"];
// local storage keys not to store
const noSaveKeys = ["wasm"];
// keys for binary array data
const arrayKeys = ["board", "clues"];

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
        this.handleDiffChange = this.handleDiffChange.bind(this);
    }

    getRandomByte() {
        return Math.floor(Math.random() * Math.floor(256));
    }

    handleClick() {
        const seed = [...Array(4)]
            .map(_ => this.getRandomByte())
            .reduce((result, c, i) => result + (c << (i * 8)));

        const board = this.state.wasm.get_puzzle(seed, this.state.difficulty);
        const clues = board.map((v, _) => v > 0);
        this.setState({
            board,
            clues,
            done: false
        });
    }

    handleDiffChange(newDiff) {
        this.setState({
            done: false,
            board: [],
            clues: [],
            difficulty: newDiff
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

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            // ignore some state keys
            if (noSaveKeys.includes(key)) continue;
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);
        
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    // handle binary data
                    if (arrayKeys.includes(key)) {
                        value = new Uint8Array(value);
                    }

                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            // ignore some state keys
            if (noSaveKeys.includes(key)) continue;
            
            let value = this.state[key];
            // handle binary data
            if (arrayKeys.includes(key)) {
                value = Array.from(value);
            }
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(value));
        }
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
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
                    <StyledButton onClick={() => this.handleDiffChange(0)}>Easy</StyledButton>
                    <StyledButton onClick={() => this.handleDiffChange(1)}>Medium</StyledButton>
                    <StyledButton onClick={() => this.handleDiffChange(2)}>Hard</StyledButton>
                    <StyledButton onClick={() => this.handleDiffChange(3)}>Evil</StyledButton>                    
                </StyledContainer>
            </div>
        );
    }
}
