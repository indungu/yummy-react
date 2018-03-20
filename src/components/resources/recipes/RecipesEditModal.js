import React from 'react';

export default (props) => {
  return (
    <div className="modal" id={`edit${props.name}`} tabIndex="-1" role="dialog" style={{ display: props.display }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoryModalLabel">Edit Recipe</h5>
            <button type="button" className="close" onClick={props.hide}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={props.onEditSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeName">Name</label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    name="recipeName"
                    value={props.name}
                    onChange={props.onChange}
                  />
                </dd>
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeIngredients">Ingredients</label>
                </dt>
                <dd>
                  <textarea
                    className="form-control"
                    name="recipeIngredients"
                    value={props.ingredients}
                    onChange={props.onChange}
                  >
                  </textarea>
                </dd>
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeDescription">Description</label>
                </dt>
                <dd>
                  <textarea
                    className="form-control"
                    name="recipeDescription"
                    value={props.description}
                    onChange={props.onChange}
                  >
                  </textarea>
                </dd>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={props.hide}>Close</button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={props.onEditSubmit}
              >Update Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
