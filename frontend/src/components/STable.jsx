import React from 'react'
import ReactTable from 'react-table'
import { tableStyle } from 'react-table/react-table.css'

function Table(props) {
  return (
    <ReactTable
      style={tableStyle}
      manual
      defaultPageSize={10}
      className={"-highlight"}
      {...props}
    />
  )
}

export default Table