import React, { Component } from "react";
import ReactDOM from "react-dom";

const wasm = import("../build/sudokuweb");

const Board = ({board}) => {
    return (
        <div>
            {board}
        </div>
    );
}

class Puzzle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: '',
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