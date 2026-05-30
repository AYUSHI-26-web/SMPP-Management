function DataTable({ columns, rows, renderRow, minWidth = 'min-w-[900px]' }) {
  return (
    <div className="animated-card overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className={`stagger-table w-full ${minWidth} border-collapse text-left text-xs`}>
        <thead>
          <tr className="bg-slate-50 text-slate-600">
            {columns.map((column) => (
              <th key={column} className="px-5 py-4 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

export default DataTable
