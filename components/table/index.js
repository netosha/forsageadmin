import {Table} from "flwww";
import styled from "styled-components";

const StyledTable = styled(Table)`
  td{
    padding: 0px;
  }
  tr{
    padding: 0px;
  }
`

const ColWraper = styled.div`
  cursor: pointer;
  padding: 10px 12px;
  background: ${props => props.active ? 'rgba(255, 204, 102, 0.5)' : ''};
 
`


function rowWraper(row, columns){
    for (let key of Object.keys(row)){
        // Check for meta keys
        if(columns.includes(key)){
            row[key] = <ColWraper active={row.active}  onClick={row.onClick}>{row[key]}</ColWraper>
        }
    }
    return row
}

export default function CustomTable({...props}){
    const rows = props.rows.forEach((row) => rowWraper(row, props.columns))
    return(
        <StyledTable
            {...props}
        />
    )
}