import styled from 'styled-components';

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
