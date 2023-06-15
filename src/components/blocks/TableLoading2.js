import React from "react";
import TableLoading from "./TableLoading";

const TableLoading2 = ({ columnSpan }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={columnSpan}>
          <TableLoading />
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoading2;
