import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Puzzle } from "./Components/Puzzle";

const wasm = import("../../build/sudokuweb");



wasm.then(wasm => {
    const App = ({match}) => {
        return (
            <div>
                <Puzzle wasm={wasm} diff={match.params.diff}/>
            </div>
        );
    };

    ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Route exact path="/:diff?" component={App} />
            </Switch>
        </BrowserRouter>, document.getElementById("root"));
});