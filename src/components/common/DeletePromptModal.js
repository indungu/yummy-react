import React from 'react';

export default (props) => {
  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" id={props.toBeDeleted} style={{ display: props.display }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Are you sure you want to delete this {props.query}?</h5>
            <button type="button" className="close" onClick={props.hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{props.toBeDeleted}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={props.hide}>Close</button>
            <button type="button" className="btn btn-danger" onClick={props.handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};
