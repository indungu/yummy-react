import React from 'react';

export default (props) => {
  return (
    <div className="modal fade show" id={`addTo${props.name}`} style={{ display: props.display }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoryModalLabel">Add Recipe</h5>
            <button type="button" className="close" onClick={props.hide}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <form onSubmit={props.onSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeName">Name</label>
                </dt>
                <dd>
                  <input
                    className="form-control"
                    id="recipeName"
                    name="recipeName"
                    placeholder="Recipe Name"
                    type="text"
                    onChange={props.onChange}
                  />
                </dd>
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeIngredients">
                    ingredients
                  </label>
                </dt>
                <dd>
                  <textarea
                    className="form-control"
                    id="recipeIngredients"
                    name="recipeIngredients"
                    placeholder="Some ingredients this recipe requires"
                    onChange={props.onChange}
                  >
                  </textarea>
                </dd>
                <dt>
                  <label className="text-primary text-regular" htmlFor="recipeDescription">
                    Description
                  </label>
                </dt>
                <dd>
                  <textarea
                    className="form-control"
                    id="recipeDescription"
                    name="recipeDescription"
                    placeholder="A slight description: preparation and serving"
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
                className="btn btn-primary"
                id={props.categoryId}
                onClick={props.onSubmit}
              >Add Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
