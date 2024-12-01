import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const Table = ({ headers, rows }) => {
  return (
    <BootstrapTable bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, idx) => (
              <td key={idx}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
