import {Table} from "flwww";
import styled from "styled-components";

const StyledTable = styled(Table)`
  td{
    padding: 0;
  }
`

const ColWraper = styled.div`
  width: 100%;
  cursor: pointer;
  padding: .8rem 1rem;
  background: ${props => props.active ? 'rgba(128, 208, 199, 0.2)' : ''};
`


function rowWraper(row, columns){
    for (let key of Object.keys(row)){
        // Check for meta keys
        if(columns.includes(key)){
            row[key] = <ColWraper active={row.active} onClick={row.onClick}>{row[key]}</ColWraper>
        }
    }
    return row
}

export default function CustomTable({...props}){
    const rows = props.rows.forEach(row => rowWraper(row, props.columns))
    return(
        <StyledTable
            {...props}
        />
    )
}