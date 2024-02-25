import React from "react";

const Table = ({
  tableHeading,
  tableRows,
  tableData,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {tableHeading.map((head, i) => (
            <th
              key={`head_${i}`}
              className={`border-b border-r p-2 font-semibold text-gray-700 ${
                i === tableHeading.length - 1 ? "" : "border-gray-300"
              }`}
            >
              {head}
            </th>
          ))}
          <th className="border-b border-r p-2 font-semibold text-gray-700 border-gray-300">
            Edit
          </th>
          <th className="border-b border-r p-2 font-semibold text-gray-700 border-gray-300">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {tableRows?.map((row, rowIndex) => (
          <tr key={`row_${rowIndex}`}>
            {tableData.map((data, colIndex) => (
              <td
                key={`data_${rowIndex}_${colIndex}`}
                className={`border-b border-r p-2 ${
                  colIndex === tableData.length - 1 ? "" : "border-gray-300"
                }`}
              >
                {data === "image" ? (
                  <img
                    src={row[data]}
                    width={100}
                    height={100}
                    alt={`Image for ${data}`}
                  />
                ) : (
                  row[data]
                )}
              </td>
            ))}
            <td className={`border-b border-r p-2 border-gray-300`}>
              <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onEditButtonClick}
                id={row["_id"]}
              >
                Edit
              </button>
            </td>
            <td className={`border-b border-r p-2 border-gray-300`}>
              <button
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                onClick={onDeleteButtonClick}
                id={row["_id"]}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
