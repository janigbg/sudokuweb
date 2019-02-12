import React from "react";
import ReactDOM from "react-dom";
import { Puzzle } from "./Components/Puzzle";

const wasm = import("../../build/sudokuweb");



wasm.then(wasm => {
    const App = () => {
        return (
            <div>
                <Puzzle wasm={wasm}/>
            </div>
        );
    };

    ReactDOM.render(
        <App />, document.getElementById("root"));
});