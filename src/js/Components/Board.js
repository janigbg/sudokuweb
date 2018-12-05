import React from "react";
import {StyledBlock, StyledTable, StyledTbody, StyledTr} from "./Styled";
import { Cell } from "./Cell";

export const Board = ({board, clues, handleChange}) => {
    if (board == null || board.len == 0) return (<div></div>);

    let table = [];

    // Outer loop to create parent
    for (let row = 0; row < 9; row++) {
        let children = [];
        //Inner loop to create children
        for (let col = 0; col < 9; col++) {
            let cell = board[row*9+col];
            let isClue = clues[row*9+col];
            children.push(
                <Cell
                    key={"cell_"+(row*9+col)}
                    index={(row*9+col).toString()}
                    value={cell > 0 ? cell : ''}
                    isClue={isClue}
                    onChange={handleChange}  />);
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