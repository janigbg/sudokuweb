import React from "react";
import {StyledInput, StyledTd} from "./Styled";

export const Cell = ({index, value, isClue, onChange}) => {
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