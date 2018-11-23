import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const wasm = import("../build/sudokuweb");

const StyledTable = styled.table`
border-collapse: collapse;
font-family: Calibri, sans-serif;
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

&:disabled {
    background-color: #EEEEEE;
}
`;

const Cell = ({index, value, isClue, onChange}) => {
    return (
        <StyledTd key={"td_"+index}>
            <StyledInput
                id={index}
                type="text"
                pattern="[0-9]"
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
                        index={(row*9+col).toString()}
                        value={cell > 0 ? cell : ''}
                        isClue={isClue}
                        onChange={this.props.handleChange}  />);
            }
            //Create the parent and add the children
            table.push(<StyledTr>{children}</StyledTr>);
        }

        return(
            <div>
                <StyledTable>
                    <StyledTbody>
                        {table}
                    </StyledTbody>
                </StyledTable>
            </div>
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

    handleClick() {
        const board = this.state.wasm.get_puzzle();
        const clues = board.map((v, _) => v > 0);
        this.setState({
            board,
            clues,
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
                <h1>Sudoku</h1>
                <button onClick={this.handleClick}>Generate puzzle</button>
                <Board
                    board={this.state.board}
                    clues={this.state.clues}
                    handleChange={this.handleChange} />
                <div>Done: {this.state.done.toString()}</div>
            </div>
        );
    }
}

wasm.then(wasm => {
  const App = () => {
    return (
      <Puzzle wasm={wasm} />
    );
  };

  ReactDOM.render(<App />, document.getElementById("root"));
});