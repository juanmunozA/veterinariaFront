import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field}>{col.title}</th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.field}>{row[col.field]}</td>
            ))}
            {actions && (
              <td>
                {actions.map((action, index) => (
                  <button key={index} onClick={() => action.onClick(row)}>
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;