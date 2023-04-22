import React from "react";
import { Table } from "reactstrap";

function TableData({ policyDatas }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Passenger Name</th>
          <th> Address </th>
          <th>Flight</th>
          <th>Date</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {policyDatas?.length &&
          policyDatas?.map((policyData) => (
            <tr>
              <td>{policyData?.[0]}</td>
              <td>{policyData?.[1]}</td>
              <td>{policyData?.[2]}</td>
              <td>{policyData?.[3]}</td>
              <td>{policyData?.[4]}</td>
              <td>{policyData?.[5]}</td>
              <td>{policyData?.[6]}</td>
              <td>{policyData?.[7]}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default TableData;
