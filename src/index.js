import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const wasm = import("../build/sudokuweb");

const StyledTable = styled.table`
border-collapse: collapse;
font-family:'Roboto',sans-serif;
font-size: 24pt;
margin: 0 auto;
`;

const StyledTbody = styled.tbody`

`;

const StyledTr = styled.tr`
&:first-child {
    border-top: solid medium;
}

&:nth-of-type(3n) {
    border-bottom: solid medium;
}
`;

const StyledTd = styled.td`
border: solid thin;
height: 1.4em;
width: 1.4em;
padding: 0;

&:first-child {
    border-left: solid medium;
}

&:nth-of-type(3n) {
    border-right: solid medium;
}
`;

const StyledInput = styled.input`
color: #000000;
width: 100%;
background-color: #FFFFFF;
outline: none;
border: 0;
padding: 0;
text-align: center;
margin: 0;
font-size: 24pt;

&:disabled {
    color: #808080;
}

-moz-appearance:textfield;
&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

`;

const StyledContainer = styled.div`
max-width: 500px;
margin: auto;
text-align: center;
position: crelative;
`;

const StyledBlock = styled.div`
margin: auto;
`;

const StyledButton = styled.a`
display:inline-block;
padding:0.35em 1.2em;
border:0.1em solid #000000;
margin:1em 0.3em 0.3em 1em;
border-radius:0.12em;
box-sizing: border-box;
text-decoration:none;
font-family:'Roboto',sans-serif;
font-weight:300;
color:#000000;
text-align:center;
transition: all 0.2s;
cursor:pointer;

&:hover{
    color:#FFFFFF;
    background-color:#000000;
}

@media all and (max-width:30em){
    display:block;
    margin:0.4em auto;
}
`;

const StyledHero = styled.div`
padding: 2em;
text-align: center;
background-image: linear-gradient(to bottom right, #98b9c9, #FFFFFF);

color: #000000;

@media all and (max-width:30em){
    padding: 1em;
}
`;

const StyledHeader = styled.h1`
font-size:4em;

@media all and (max-width:30em){
    font-size:2em;
}
`;

const Cell = ({index, value, isClue, onChange}) => {
    return (
        <StyledTd key={"td_"+index}>
            <StyledInput
                id={index}
                type="number"
                pattern="[0-9]*"
                key={"i_"+index}
                value={value}
                disabled={isClue}
                onChange={(e) =>
                    onChange(e, index)
                }
                maxLength="1" />
        </StyledTd>
    );
}

// <input id={(row*9+col).toString()} type="text" value={board[row*9+col] > 0 ? board[row*9+col] : ' '} disabled={board[row*9+col] > 0}></input>
class Board extends Component {
    render () {
        if (this.props.board == null || this.props.board.len == 0) return (<div></div>);

        let table = [];

        // Outer loop to create parent
        for (let row = 0; row < 9; row++) {
            let children = [];
            //Inner loop to create children
            for (let col = 0; col < 9; col++) {
                let cell = this.props.board[row*9+col];
                let isClue = this.props.clues[row*9+col];
                children.push(
                    <Cell
                        key={"cell_"+(row*9+col)}
                        index={(row*9+col).toString()}
                        value={cell > 0 ? cell : ''}
                        isClue={isClue}
                        onChange={this.props.handleChange}  />);
            }
            //Create the parent and add the children
            table.push(<StyledTr key={"row_"+row}>{children}</StyledTr>);
        }

        return(
            <StyledBlock>
                <StyledTable>
                    <StyledTbody>
                        {table}
                    </StyledTbody>
                </StyledTable>
            </StyledBlock>
        );
    }
}

class Puzzle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            done: false,
            board: [],
            clues: [],
            wasm: props.wasm,
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

        const board = this.state.wasm.get_puzzle(seed);
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
                    <StyledButton onClick={this.handleClick}>Generate puzzle</StyledButton>
                    <Board
                        board={this.state.board}
                        clues={this.state.clues}
                        handleChange={this.handleChange} />
                    <div>Done: {this.state.done.toString()}</div>
                </StyledContainer>
            </div>
        );
    }
}

wasm.then(wasm => {
  const App = () => {
    return (
        <div>
            <Puzzle wasm={wasm} />
        </div>
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));
});