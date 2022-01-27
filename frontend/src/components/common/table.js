import React, { useState } from "react";
// import "./App.css";
var tableRowIndex = 0;
function TableRow({ row, handleDataChange, deleteRow }) {
  const index = row.index;
  const [first_name, handleChangeFirstName] = useState(row.first_name);
  const [last_name, handleChangeLastName] = useState(row.last_name);

  const updateValues = (e) => {
    var inputName = e.target.name;
    var inputValue = e.target.value;
    if (inputName == "first_name") {
      handleChangeFirstName(inputValue);
    } else if (inputName == "last_name") {
      handleChangeLastName(inputValue);
    }

    handleDataChange({
      index: index,
      first_name: first_name,
      last_name: last_name,
    });
  };

  const removeRow = () => {
    deleteRow(index);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          type="text"
          name="first_name"
          className="first_name"
          placeholder="First Name"
          value={first_name}
          onChange={updateValues}
        ></input>
        <input
          type="text"
          name="last_name"
          className="last_name"
          placeholder="Last Name"
          value={last_name}
          onChange={updateValues}
        ></input>
      </td>
      <td>
        <button type="button" className="btn btn-remove" onClick={removeRow}>
          &times;
        </button>
      </td>
    </tr>
  );
}

function Table() {
  const [talbeRows, setRows] = useState([
    {
      index: 0,
      first_name: "",
      last_name: "",
    },
  ]);

  // Receive data from TableRow
  const handleChange = (data) => {
    talbeRows[data.index] = data;
  };

  // Add New Table Row
  const addNewRow = () => {
    tableRowIndex = parseFloat(tableRowIndex) + 1;
    var updatedRows = [...talbeRows];
    updatedRows[tableRowIndex] = {
      index: tableRowIndex,
      first_name: "",
      last_name: "",
    };
    setRows(updatedRows);
  };

  // Remove Table row if rows are count is more than 1
  const deleteRow = (index) => {
    if (talbeRows.length > 1) {
      var updatedRows = [...talbeRows];
      var indexToRemove = updatedRows.findIndex((x) => x.index == index);
      if (indexToRemove > -1) {
        updatedRows.splice(indexToRemove, 1);
        setRows(updatedRows);
      }
    }
  };

  return (
    <div className="customers">
      <table className="table" id="customers">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {talbeRows.map((row, index) => {
            if (row)
              return (
                <TableRow
                  key={index}
                  row={row}
                  handleDataChange={handleChange}
                  deleteRow={deleteRow}
                ></TableRow>
              );
          })}
        </tbody>
      </table>
      <div>
        <button className="btn-add" onClick={addNewRow}>
          +Add
        </button>
      </div>
    </div>
  );
}

export default Table;
