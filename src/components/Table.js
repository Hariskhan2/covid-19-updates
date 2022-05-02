import React from "react";
import "./Table.css";
import numeral from "numeral";
function Table(props) {
  return (
    <div className="table">
      {props.countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0.0a")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
