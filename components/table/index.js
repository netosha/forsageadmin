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
`


function rowWraper(row, columns, onRowClick){
    for (let key of Object.keys(row)){
        // Check for meta keys
        if(columns.includes(key)){
            row[key] = <ColWraper onClick={row.onClick}>{row[key]}</ColWraper>
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