import React, { Component } from "react";
import ReactDOM from "react-dom";

const wasm = import("../build/sudokuweb");

const Board = ({board}) => {
    if (board == null || board.len == 0) return (<div></div>);

    let table = []

    // Outer loop to create parent
    for (let row = 0; row < 9; row++) {
      let children = []
      //Inner loop to create children
      for (let col = 0; col < 9; col++) {
        children.push(<td key={(row*9+col).toString()}>{board[row*9+col] > 0 ? board[row*9+col] : ' '}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }

    return(
        <div>
            <table>
                <tbody>
                    {table}
                </tbody>
            </table>
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
                <h1>Hi there</h1>
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