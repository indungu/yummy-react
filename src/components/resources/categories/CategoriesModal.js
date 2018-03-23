import React from 'react';

const CategoryModal = (props) => {
  return (
    <div
      className="modal fade show"
      id="categoryAddModal"
      tabIndex="-1"
      role="dialog"
      style={{ display: props.display }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoryModalLabel">
              Add Recipe Category
            </h5>
            <button
              type="button"
              className="close"
              onClick={props.hide}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={props.onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <dt>
                  <label className="text-primary text-regular" htmlFor="categoryName">Name</label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    id="categoryName"
                    name="categoryName"
                    placeholder="Category name"
                    type="text"
                    onChange={props.onChange}
                    required
                  />
                </dd>
                <dt>
                  <label className="text-primary text-regular" htmlFor="categoryDescription">Description</label>
                </dt>
                <dd>
                  <textarea
                    className="form-control"
                    id="categoryDescription"
                    name="categoryDescription"
                    placeholder="A slight description"
                    onChange={props.onChange}
                    required
                  >
                  </textarea>
                </dd>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={props.hide}
              >
              Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
