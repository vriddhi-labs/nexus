import React from 'react';

export const Table = ({ data = [], columns = [] }) => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm border-collapse">
        <thead className="[&_tr]:border-b border-border">
          <tr className="border-b border-border transition-colors hover:bg-muted/50">
            {columns.map(col => (
              <th key={col.key} className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="border-b border-border transition-colors hover:bg-muted/50">
              {columns.map(col => (
                <td key={col.key} className="p-4 align-middle font-medium">
                  {row[col.dataIndex || col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
