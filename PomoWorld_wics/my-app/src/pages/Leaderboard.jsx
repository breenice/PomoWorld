import React from 'react';
import { useTable } from 'react-table';
import "./Leaderboard.css";

const data = [
  { name: "CatBob", score: 1200 },
  { name: "Burgerpants", score: 950 },
  { name: "breadman", score: 850 },
  { name: "pinkSick", score: 500 },
];

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Score", accessor: "score" },
];

export default function Leaderboard() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
<div className="leaderboard-container">
  <div className="leaderboard-header">
    <h1>Leaderboard</h1>
  </div>
  <table {...getTableProps()} className="leaderboard-table">
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => {
            const { key, ...rest } = column.getHeaderProps();
            return <th key={key} {...rest}>{column.render("Header")}</th>;
          })}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => (
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

  );
}