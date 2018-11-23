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
text-align: center;
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
padding: 0;
border: 0;
text-align: center;
width: 48px;
height: 48px;
font-size: 24px;
background-color: #FFFFFF;
outline: none;

&:disabled {
    background-color: #EEEEEE;
}
`;
// <input id={(row*9+col).toString()} type="text" value={board[row*9+col] > 0 ? board[row*9+col] : ' '} disabled={board[row*9+col] > 0}></input>
const Board = ({board}) => {
    if (board == null || board.len == 0) return (<div></div>);

    let table = []

    // Outer loop to create parent
    for (let row = 0; row < 9; row++) {
      let children = []
      //Inner loop to create children
      for (let col = 0; col < 9; col++) {
        children.push(
        <StyledTd key={(row*9+col).toString()}>
            {board[row*9+col] > 0 ? board[row*9+col] : ' '}
        </StyledTd>)
      }
      //Create the parent and add the children
      table.push(<StyledTr>{children}</StyledTr>)
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

class Puzzle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            wasm: props.wasm
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({board: state.wasm.get_puzzle()}));
    }

    render () {
        return (
            <div>
                <h1>Sudoku</h1>
                <button onClick={this.handleClick}>Generate puzzle</button>
                <Board board={this.state.board} />
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