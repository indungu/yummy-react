import { Table } from 'react-bootstrap';
import React from 'react';

export default (props) => {
  if (!props.data) {
    return (
      <div className="row text-center">
        <p className="info">Please add some new categories.</p>
      </div>
    );
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { props.data.map((data, index) => {
            return (
              <tr key={index} >
                <td>{ data.category_name }</td>
                <td>{ data.description }</td>
                <td>None</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
