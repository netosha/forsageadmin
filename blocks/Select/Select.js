import React, {Component} from 'react';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

const SelectBox = styled.select`
  height: 36px;
  background: white;
  color:gray;
  padding: 0px 16px;
  border-radius: 6px;
  font-size: 18px;
  letter-spacing: 0px;
  line-height: 1.2;
  font-weight: 500;
  -webkit-appearance:none;
  font-style: normal;
  box-shadow: ${props => props.error ? 'inset 0 0 0 1px red !important' : ''};
  transition: 0.1s;
  
  &:focus{
    box-shadow: inset 0 0 0 1px#80d0c7 !important;
    transition: 0.1s;
  }
`


function Select(props) {
    return (
        <SelectBox {...props} >
            {!props.loading ? props.children : <Loader
                type="ThreeDots"
                color="#80d0c7"
                height={12}
            />}
        </SelectBox>
    );
}

export default Select;