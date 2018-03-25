import React from 'react';

export default (props) => {
  return (
    <div
      className="col-md-10"
    >
      <form
        className="form-row align-items-center"
        onSubmit={props.onSubmit}
      >
        <div className="form-group mx-sm-3 mb-2 col-9">
          <input
            type="text"
            className="form-control"
            placeholder={props.scope}
            name="queryString"
            onChange={props.onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Search</button>
      </form>
    </div>
  );
};
